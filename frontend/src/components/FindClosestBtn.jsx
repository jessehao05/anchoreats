
import toast from 'react-hot-toast'

const FindClosestBtn = () => {

    const buttonAction = () => {
        toast.success('button pressed!')
    }



  return (
    <div className="btn btn-secondary" onClick={buttonAction}>
        Find Closest
    </div>
  )
}

export default FindClosestBtn