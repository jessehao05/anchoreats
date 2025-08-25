import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { useState } from 'react';


const Map = ( params ) => {
  const [data, setData] = useState(params);
  const [currentLocation, setCurrentLocation] = useState();

  // console.log(data)
  // console.log(data.param)
  // console.log(data.param[0].location.lat, data.param[0].location.lng)


  return (
    <div className="h-full">

        <MapContainer className="h-full" center={[36.144523, -86.802633]} zoom={14} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

          
            {data.params.map((rest, index) => {

                // console.log('marker:', rest.location.lat, rest.location.lng);

                return (
                  <Marker key={index} position={[rest.location.lat, rest.location.lng]}>
                    <Popup>
                      {rest.name}
                    </Popup>
                  </Marker>
                );
            })}

            <Marker position={[36.14404496955764, -86.80270977072728]}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>

    </div>
  )
}

export default Map