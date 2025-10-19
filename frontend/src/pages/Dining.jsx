import React, { useEffect, useState } from 'react'
import dining from '../dining.json' with { type: 'json' };
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import DiningBar from '../components/DiningBar';
import SelectedHall from '../components/SelectedHall';

const Dining = () => {
  const [filteredHalls, setFilteredHalls] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleSearch = (query) => {
      const searchMatches = dining.filter(hall => {
        const regex = new RegExp(query, 'gi');
        return hall.name.match(regex);
      })
      setFilteredHalls(searchMatches);
  };

  const handleClick = (hall) => {
    console.log(hall.name)
    setSelected(hall);
  }

  // console.log(dining)

  return (
    <div className="min-h-screen" style={{paddingLeft: "calc(100vw - 100%"}}>
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-16">
        <div className="py-4 text-lg font-semibold">Search Dining Hall</div>
        <SearchBar onSearch={handleSearch}/>
        <div className="border-2">
          {filteredHalls.map(hall => {
            return <DiningBar key={hall.name} hall={hall} onClick={() => handleClick(hall)}/>
          })}
        </div>
          

          {selected && (
            <SelectedHall selected={selected} />
          )} 

      </div>
      
      
    </div>
  )
}

export default Dining