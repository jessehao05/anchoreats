import { Link } from "react-router"

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-black flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-black font-medium">AnchorEats</Link>

        <div className="flex space-x-6">
            <Link to="/swipes" className="text-black hover:text-gray-600">
                Meal Swipes Calculator
            </Link>
            <Link to="/map" className="text-black hover:text-gray-600">
                Taste of Nashville Map
            </Link>
        </div>
    </nav>
  )
}

export default Navbar