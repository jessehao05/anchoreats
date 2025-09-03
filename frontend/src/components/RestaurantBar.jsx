import React from 'react'

const RestaurantBar = ( { title, description, distance, status, handleClick } ) => {
  const getRestaurantTitle = () => {
    // console.log(title);
    // console.log(typeof(title));
    handleClick(title);
  }


  return (
    <div onClick={getRestaurantTitle} className="rounded-[10px] bg-[#F0EAEA] hover:bg-[#E9D0D0] flex flex-row justify-between">
        <div className="left px-3 py-3 flex flex-col justify-center">
            <div className="restaurant-title text-base/5 mb-1">{title}</div>
            <div className="restaurant-desc text-xs text-gray-500">{description}</div>
            {status ? <div className="restaurant-status text-xs text-green-600 mt-1">OPEN</div> : <div className="restaurant-status text-xs text-red-500 mt-1">CLOSED</div>}
        </div>
        <div className="right flex flex-col justify-center items-center py-2 px-4">
            <div className="restaurant-distance text-2xl">{distance}</div>
            <div className="text-xs">mi</div>
        </div>
        
    </div>
  )
}

export default RestaurantBar