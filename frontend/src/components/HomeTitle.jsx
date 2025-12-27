import HomeButton from "./HomeButton"

const HomeTitle = () => {
  return (
    <div className="flex flex-1 justify-center items-center">
        <div className="text-center">
            <div className="mb-12 lg:mb-20">
                <h2 className="font-bold text-4xl lg:text-8xl mb-2">AnchorEats</h2>
                <p className="text-l lg:text-xl mx-12">Helpful features for Vanderbilt dining</p>
            </div>

            <div className="flex flex-col lg:flex-wrap lg:flex-row justify-center items-center 
            gap-1 lg:gap-4">
                <HomeButton text="Meal Swipes Calculator" destination="/swipes" />
                <HomeButton text="Dining Times" destination="/dining" />
                <HomeButton text="Taste of Nashville Map" destination="/map" />
            </div>
            
        </div>
    </div>

    
  )
}

export default HomeTitle