import { Link } from "react-router"

const HomeButton = ( { text, destination} ) => {
  return (
    <Link to={destination} className="btn btn-outline">
        {text}
    </Link>
  )
}

export default HomeButton