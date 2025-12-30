import { useState } from "react"
import { Link } from "react-router"
import { Menu, X, MessageSquareMore } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-black px-6 py-4 flex justify-between items-center relative">
      
        <Link to="/" className="text-black font-medium">AnchorEats</Link>

        <div className="hidden md:flex space-x-6">
            <Link to="/swipes" className="text-black hover:text-gray-600">
                Meal Swipes Calculator
            </Link>
            <Link to="/dining" className="text-black hover:text-gray-600">
                Dining Times
            </Link>
            <Link to="/map" className="text-black hover:text-gray-600">
                Taste of Nashville Map
            </Link>
            <Link to="/submit" className="text-black hover:text-gray-600">
              <MessageSquareMore strokeWidth={1.5}/>
            </Link>
            
        </div>

        {/* mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-black focus:outline-none">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isOpen && (
        <div className="absolute right-0 top-full w-full bg-white border border-gray flex flex-col items-end z-50">
          <Link to="/swipes" className="px-4 py-2 text-black hover:bg-gray-100"
            onClick={() => setIsOpen(false)}>
            Meal Swipes Calculator
          </Link>
          <Link to="/dining" className="px-4 py-2 text-black hover:bg-gray-100"
            onClick={() => setIsOpen(false)}>
            Dining Times
          </Link>
          <Link to="/map" className="px-4 py-2 text-black hover:bg-gray-100"
            onClick={() => setIsOpen(false)}>
            Taste of Nashville Map
          </Link>
          <Link to="/submit" className="px-4 py-2 text-black hover:bg-gray-100">
            <MessageSquareMore strokeWidth={1.5}/>
          </Link>
          
        </div>
        )}

      
    </nav>
  )
}

export default Navbar