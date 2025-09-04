import { useState } from "react"
import { Link } from "react-router"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-black px-6 py-4 flex justify-between items-center relative">
      
        <Link to="/" className="text-black font-medium">AnchorEats</Link>

        <div className="hidden md:flex space-x-6">
            <Link to="/swipes" className="text-black hover:text-gray-600">
                Meal Swipes Calculator
            </Link>
            <Link to="/map" className="text-black hover:text-gray-600">
                Taste of Nashville Map
            </Link>
        </div>

        {/* mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-black focus:outline-none">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isOpen && (
        <div className="absolute right-0 top-full w-full bg-white border border-gray flex flex-col text-right z-50">
          <Link to="/swipes" className="px-4 py-2 text-black hover:bg-gray-100"
            onClick={() => setIsOpen(false)}>
            Meal Swipes Calculator
          </Link>
          <Link to="/map" className="px-4 py-2 text-black hover:bg-gray-100"
            onClick={() => setIsOpen(false)}>
            Taste of Nashville Map
          </Link>
        </div>
        )}

      
    </nav>
  )
}

export default Navbar