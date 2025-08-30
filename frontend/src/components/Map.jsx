import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { useState } from 'react';


const Map = ( {restaurants, location} ) => {
  const [data, setData] = useState(restaurants);
  const [currentLocation, setCurrentLocation] = useState();

  // console.log(data)
  // console.log(data.param)
  // console.log(data.param[0].location.lat, data.param[0].location.lng)
  console.log(restaurants)


  return (
    <div className="h-full">

        <MapContainer className="h-full" center={[36.144523, -86.802633]} zoom={14} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

          
            {restaurants.map((rest, index) => {

                // console.log('marker:', rest.location.lat, rest.location.lng);

                return (
                  <Marker key={index} position={[rest.location.lat, rest.location.lng]}>
                    <Popup>
                      {rest.name}
                    </Popup>
                  </Marker>
                );
            })}

            <CircleMarker
              center={[location.lat, location.lng]}
              radius={6}
              pathOptions={{ fillColor: 'blue', color: 'blue', weight: 1, fillOpacity: 0.5 }}
            >
              <Popup>Current location!</Popup>
            </CircleMarker>
        </MapContainer>

    </div>
  )
}

export default Map