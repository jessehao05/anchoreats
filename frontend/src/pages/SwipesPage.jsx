import Navbar from "../components/Navbar"
import Map from "../components/Map"

const testData = [
  { name: "Barista Parlor", 
    description: "Coffee shop", 
    location: { lat: 36.135830, lng: -86.801090 }
  },
  { name: "Biscuit Love", 
        description: "Southern breakfast", 
        location: { lat: 36.136761, lng: -86.799724 }
    },
    { name: "Grain & Berry", 
        description: "Açaí shop", 
        location: { lat: 36.136358, lng: -86.799432 }
    }
  ];

const SwipesPage = () => {
  return (
    <div className="min-h-screen">
        <Navbar/>

        <div className="h-[400px] p-20 flex">
          <div className="h-lh w-2/3">
            <Map data={testData}/>
          </div>
          <div className="w-1/3">Hi</div>
        </div>

       
      
    </div>
  )
}

export default SwipesPage