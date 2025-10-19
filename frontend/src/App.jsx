import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import SwipesPage from "./pages/SwipesPage"
import ToNMapPage from "./pages/ToNMapPage"
import Dining from "./pages/Dining"

const App = () => {
  return (
    <div className="">

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/swipes" element={<SwipesPage />} />
        <Route path="/map" element={<ToNMapPage />} />
        <Route path ="/dining" element={<Dining />} />
      </Routes>



    </div>
  )
}

export default App