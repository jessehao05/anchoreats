import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import { api } from "../lib/axios";
import toast from "react-hot-toast";
import Map from "../components/Map";
import Menu from "../components/Menu";
import { data } from "react-router";

const ToNMapPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [restData, setRestData] = useState({});
  const [filteredRestData, setFilteredRestData] = useState([]);
  const [location, setLocation] = useState({lat: 0, lng: 0});
  const [selected, setSelected] = useState([]);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const fetchRestData = async () => {
      try {
        const userLocation = await getLocation();
        setLocation(userLocation);
        console.log(`current location: ${userLocation.lat}, ${userLocation.lng}`)

        const res = await api.get("/data");

        console.log('the response data is: ', res.data)
        // console.log(typeof(res))
        // console.log(typeof(res.data))

        const dataWithDistance = addDistanceAndOpen(res.data, userLocation);
        console.log('final update for the data: ', dataWithDistance);
        setRestData(dataWithDistance);

      } catch (error) {
        console.log(error);

        if (error.response && error.response.status == 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load restaurant data");
        }
      } finally {
        setIsLoading(false);
      }
    }

    const getLocation = async () => {
      return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const locationData = {lat: position.coords.latitude, lng: position.coords.longitude};
              console.log(position.coords.latitude, position.coords.longitude)
              resolve(locationData);
              // set location loading to false
            },
            (error) => reject(error)
          );
        } else {
          reject(new Error("Geolocation not supported by browser."));
        }
      })

    }

    const addDistanceAndOpen = (oldData, userLocation) => {
      console.log('old distance data: ', oldData);
      
      const curLat = userLocation.lat;
      const curLong = userLocation.lng;
      console.log(curLat, curLat)
      
      const newData = oldData.map((rest) => {
        // console.log(rest.location.lat, rest.location.lng)
        return {
          ...rest,
          distance: Math.round(calculateHaversineDistance(curLat, curLong, rest.location.lat, rest.location.lng) * 100) / 100,
          open: determineIfOpen(rest.hours)
        }
      });

      console.log('new distance data: ', newData);
      return newData;

    }

    const calculateHaversineDistance = (lat1, lng1, lat2, lng2) => {
      const toRadians = (degrees) => degrees * (Math.PI / 180);

      const R = 3958.8;
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lng2 - lng1);
      const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; 
      return distance;
    }

    const determineIfOpen = ( hours ) => {
      const now = new Date();
      const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      const dayKey = days[now.getDay()];
      const currentTime = now.toTimeString().slice(0, 5);

      const isBetween = (time, start, end) => {
        if (start < end) {
          return time >= start && time < end;
        } else {
          // overnight case
          return time >= start || time < end;
        }
      }

      // checking all intervals
      const todaysHours = hours[dayKey] || [];
      for (const interval of todaysHours) {
        if (isBetween(currentTime, interval.open, interval.close)) {
          return true;
        }
      }
      return false;
    }

    fetchRestData();
  }, []);

    const handleSearch = (query) => {
      
      const searchMatches = restData.filter(restaurant => {
        const regex = new RegExp(query, 'gi');
        return restaurant.name.match(regex) || restaurant.description.match(regex)
      })

      setFilteredRestData(searchMatches);
    }

    const handleBarClick = (clicked) => {
      console.log("from the ToN page: ", clicked); // works as expected
      const wanted = restData.find(rest => rest.name === clicked);
      setSelected(wanted._id);
    }

    const calculateClosest = () => {
      const closestFive = [...restData]
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5)
      console.log(closestFive)
      console.log(typeof(closestFive[0].distance))
      setFilteredRestData(closestFive);
    }

  return (
    <div className="min-h-screen">
        <Navbar/>

        {/* {isRateLimited && <RateLimitedUI />} */}

        <div className="max-w-7xl mx-auto mt-6">
          {isLoading && <div className="text-center text-primary-content py-10">Loading restaurant data...</div>}

          {restData.length > 0 && (
            <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
              <div className="w-full h-[50vh] lg:h-[600px] lg:w-2/3">
                <Map restaurants={restData} location={location} selected={selected} handleRestClick={handleBarClick}/>
              </div>
              <div className="w-full lg:w-1/3 overflow-auto">
                <Menu handleClick={handleBarClick} handleClosest={calculateClosest} onSearch={handleSearch} displayedData={filteredRestData} />
              </div>
            </div>
          )}
          
        </div>
    </div>
  )
}

export default ToNMapPage