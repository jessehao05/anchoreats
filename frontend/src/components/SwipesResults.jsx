import React from 'react'

const SwipesResults = ({ meals, days}) => {
  return (
    <div className="mt-12 border-2 border-gray-300 p-6 shadow-md rounded-lg">
        Meals per day: <strong>{(meals / days).toFixed(2)}</strong><br />
        Meals remaining: <strong>{meals}</strong><br />
        Days remaining: <strong>{days}</strong>
    </div>
  )
}

export default SwipesResults