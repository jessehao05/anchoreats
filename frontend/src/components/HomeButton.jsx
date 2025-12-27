import { Link } from "react-router"

const HomeButton = ( { text, destination} ) => {
  return (
    <Link to={destination} className="btn btn-outline scale-75 lg:scale-100">
        {text}
    </Link>
  )
}

export default HomeButton