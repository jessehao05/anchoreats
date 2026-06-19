import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router"
import HomePage from "./pages/HomePage"
import SwipesPage from "./pages/SwipesPage"
import ToNMapPage from "./pages/ToNMapPage"
import Dining from "./pages/Dining"
import SubmitFeedback from "./pages/SubmitFeedback"
import Feedback from "./pages/Feedback"
import SetupInstructions from "./pages/SetupInstructions"
import { logPageView } from "./lib/analytics"

const App = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname);
  }, [location.pathname]);

  return (
    <div className="">

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/swipes" element={<SwipesPage />} />
        <Route path="/map" element={<ToNMapPage />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/submit" element={<SubmitFeedback />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/setup" element={<SetupInstructions />} />
      </Routes>



    </div>
  )
}

export default App