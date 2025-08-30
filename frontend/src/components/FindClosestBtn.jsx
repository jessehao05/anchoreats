
import toast from 'react-hot-toast'

const FindClosestBtn = () => {

    const buttonAction = () => {
        toast.success('button pressed!')
    }



  return (
    <div className="btn btn-secondary mt-5" onClick={buttonAction}>
        Find Closest
    </div>
  )
}

export default FindClosestBtn