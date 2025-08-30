import React from 'react'

const RestaurantBar = ( { title, description, distance } ) => {
  return (
    <div className="rounded-[10px] bg-[#F0EAEA] hover:bg-[#E9D0D0] flex flex-row justify-between">
        <div className="left px-3 py-3 flex flex-col justify-center">
            <div className="text-base/5 mb-1">{title}</div>
            <div className="text-xs text-gray-500">{description}</div>
        </div>
        <div className="right flex flex-col justify-center items-center py-2 px-4">
            <div className="text-2xl">{distance}</div>
            <div className="text-xs">mi</div>
        </div>
        
    </div>
  )
}

export default RestaurantBar