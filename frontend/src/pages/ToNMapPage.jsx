import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import { api } from "../lib/axios";
import toast from "react-hot-toast";
import Map from "../components/Map";
import Menu from "../components/Menu";

const ToNMapPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [restData, setRestData] = useState([]);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const fetchRestData = async () => {
      try {
        const res = await api.get("/data");
        console.log('the response data is: ', res.data)
        setRestData(res.data);

      } catch (error) {
        console.log(error);

        if (error.response.status == 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load restaurant data");
        }
      } finally {
        setIsLoading(false);
      }
    }


    fetchRestData();
  }, []);

  return (
    <div className="min-h-screen">
        <Navbar/>

        {/* {isRateLimited && <RateLimitedUI />} */}

        <div className="max-w-7xl mx-auto p-4 mt-6">
          {isLoading && <div className="text-center text-primary-content py-10">Loading restaurant data...</div>}

          {restData.length > 0 && (
            <div className="p-20 flex gap-12">
              <div className="h-[500px] w-2/3">
                <Map params={restData}/>
              </div>
              <div className="">
                <Menu />
              </div>
            </div>
          )}
          
        </div>
    </div>
  )
}

export default ToNMapPage