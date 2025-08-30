import FindClosestBtn from "./FindClosestBtn"
import RestaurantBar from "./RestaurantBar"
import SearchBar from "./SearchBar"
import { useState } from "react"

const Menu = ({ onSearch, displayedData }) => {
  const [searching, setSearching] = useState(true);
  // console.log(displayedData)

  return (
    <div className="h-[500px] w-72 border-2 border-black p-4 overflow-auto flex flex-col gap-1">
        {searching && <SearchBar onSearch={onSearch}/>}

        {displayedData.map((rest, index) => {
          return (
            <RestaurantBar title={rest.name} description={rest.description} distance={rest.distance} />
          )
        })}

        {/* <RestaurantBar title='test title' description='test description' distance={21}/> */}

        




        <FindClosestBtn />
    </div>
  )
}

export default Menu