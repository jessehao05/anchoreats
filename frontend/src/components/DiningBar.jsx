import React from 'react'

const DiningBar = ({hall, onClick}) => {
  return (
    <div className="hover:font-bold cursor-pointer w-64 py-2 flex justify-center" onClick={onClick}>
        {hall.name}
    </div>
  )
}

export default DiningBar