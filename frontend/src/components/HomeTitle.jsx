import HomeButton from "./HomeButton"

const HomeTitle = () => {
  return (
    <div className="flex flex-1 justify-center items-center">
        <div className="text-center">
            <div className="mb-20">
                <h2 className="font-bold text-8xl mb-2">AnchorEats</h2>
                <p className="text-xl">Helpful features for Vanderbilt dining</p>
            </div>

            <div className="flex gap-5 flex-wrap">
                <HomeButton text="Meal Swipes Calculator" destination="/swipes" />
                <HomeButton text="Meal Money Calculator" destination="/money" />
                <HomeButton text="Taste of Nashville Map" destination="/map" />
            </div>
            
        </div>
    </div>

    
  )
}

export default HomeTitle