import React from 'react'

const SwipesResults = ({ meals, days}) => {
  return (
    <div className="mt-4 p-6 bg-gray-100 rounded-lg">
        Meals per day: <strong>{(meals / days).toFixed(2)}</strong><br />
        Meals remaining: <strong>{meals}</strong><br />
        Days remaining: <strong>{days}</strong>
    </div>
  )
}

export default SwipesResults