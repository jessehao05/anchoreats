import Navbar from "../components/Navbar"
import HomeTitle from "../components/HomeTitle"

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <HomeTitle />
    </div>
  )
}

export default HomePage