import FindClosestBtn from "./FindClosestBtn"
import RestaurantBar from "./RestaurantBar"
import SearchBar from "./SearchBar"
import { useState } from "react"

const Menu = ({ onSearch, displayedData, handleClick, handleClosest }) => {
  const [searching, setSearching] = useState(true);
  const [data, setData] = useState(displayedData);
  console.log(displayedData) 

  return (
    <div className="h-[600px] w-72 border-2 border-black p-4 overflow-auto flex flex-col gap-1">
        {searching && <SearchBar onSearch={onSearch}/>}

        {searching && displayedData.map((rest, idx) => {
          return (
            <RestaurantBar key={idx} title={rest.name} description={rest.description} distance={rest.distance} status={rest.open} handleClick={handleClick}/>
          )
        })}

        <FindClosestBtn handleClosest={handleClosest}/>
    </div>
  )
}

export default Menu