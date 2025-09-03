import Navbar from "../components/Navbar"
import Map from "../components/Map"
import SwipesForm from "../components/SwipesForm"

// const testData = [
//   { name: "Barista Parlor", 
//     description: "Coffee shop", 
//     location: { lat: 36.135830, lng: -86.801090 }
//   },
//   { name: "Biscuit Love", 
//         description: "Southern breakfast", 
//         location: { lat: 36.136761, lng: -86.799724 }
//     },
//     { name: "Grain & Berry", 
//         description: "Açaí shop", 
//         location: { lat: 36.136358, lng: -86.799432 }
//     }
//   ];

const SwipesPage = () => {
  return (
    <div className="min-h-screen">
        <Navbar/>

        <SwipesForm />
      
    </div>
  )
}

export default SwipesPage