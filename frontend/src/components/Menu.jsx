import FindClosestBtn from "./FindClosestBtn"
import RestaurantBar from "./RestaurantBar"
import SearchBar from "./SearchBar"
import { useState } from "react"

const Menu = ({ onSearch, displayedData, handleClick, handleClosest }) => {
  const [searching, setSearching] = useState(true);
  const [data, setData] = useState(displayedData);
  console.log(displayedData) 

  return (
    <div className="h-[50vh] lg:h-[600px] w-full lg:w-72 mx-auto border-2 border-gray-200 rounded-lg overflow-hidden">
      <div className="h-full p-4 overflow-auto flex flex-col gap-1">
        {searching && <SearchBar onSearch={onSearch}/>}

        {searching && displayedData.map((rest, idx) => {
          return (
            <RestaurantBar key={idx} title={rest.name} description={rest.description} distance={rest.distance} status={rest.open} handleClick={handleClick}/>
          )
        })}

        <FindClosestBtn handleClosest={handleClosest}/>
      </div>
    </div>
  )
}

export default Menu