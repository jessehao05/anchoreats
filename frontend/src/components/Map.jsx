import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { useState } from 'react';
import * as L from "leaflet";


const Map = ( {restaurants, location, selected = "", handleRestClick} ) => {
  const [data, setData] = useState(restaurants);
  const [currentLocation, setCurrentLocation] = useState(location);

  const onRestClick = (query) => {
    handleRestClick(query);
  }

  // console.log(data)
  // console.log(data.param)
  // console.log(data.param[0].location.lat, data.param[0].location.lng)
  // console.log(restaurants)

  const createIcon = (isSelected) => {   
    const scale = isSelected ? 1.1 : 1;
    const size = [25 * scale, 41 * scale];
    const anchor = [12 * scale, 20 * scale];

    const iconUrl = isSelected 
      ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png'
      : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png';
    
    const iconRetinaUrl = isSelected
      ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'
      : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png';
    

    return L.icon({
      iconUrl: iconUrl,
      iconRetinaUrl: iconRetinaUrl,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: size,      
      iconAnchor: anchor,      
      popupAnchor: [0, -17 * scale],         
      tooltipAnchor: [16 * scale, -28 * scale],
      shadowSize: [41 * scale, 41 * scale],
      shadowAnchor: [12 * scale, 41 * scale]              
    });
  };


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
                  <Marker 
                    key={index} 
                    position={[rest.location.lat, rest.location.lng]} 
                    // opacity={selected === rest._id ? 1.0 : 0.5}
                    zIndexOffset={selected === rest._id ? 1000 : 0}
                    icon={createIcon(selected === rest._id)}
                    eventHandlers={{
                      click: () => { 
                        console.log(`clicked : ${rest.name}`)
                        onRestClick(rest.name);
                       }
                    }}
                  >
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