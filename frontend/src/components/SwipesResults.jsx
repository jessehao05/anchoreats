import React from 'react'

const SwipesResults = ({ meals, days}) => {
  return (
    <div className="mt-4 border-2 border-gray-300 p-4 shadow-md rounded-lg text-sm">
        Meals per day: <strong>{(meals / days).toFixed(2)}</strong><br />
        Meals remaining: <strong>{meals}</strong><br />
        Days remaining: <strong>{days}</strong>
    </div>
  )
}

export default SwipesResults