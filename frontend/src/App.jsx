import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import SwipesPage from "./pages/SwipesPage"
import MoneyPage from "./pages/MoneyPage"
import ToNMapPage from "./pages/ToNMapPage"

const App = () => {
  return (
    <div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/swipes" element={<SwipesPage />} />
        <Route path="/money" element={<MoneyPage />} />
        <Route path="/map" element={<ToNMapPage />} />
      </Routes>



    </div>
  )
}

export default App