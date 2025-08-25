import FindClosestBtn from "./FindClosestBtn"
import RestaurantBar from "./RestaurantBar"
import SearchBar from "./SearchBar"
import { useState } from "react"

const Menu = () => {
  const [searching, setSearching] = useState(true);

  return (
    <div className="h-[500px] w-72 border-2 border-black p-4 overflow-auto flex flex-col gap-1">
        {/* <RestaurantBar title='test title' description='test description' distance={21}/> */}

        {searching && <SearchBar />}
        <FindClosestBtn />

        
    </div>
  )
}

export default Menu