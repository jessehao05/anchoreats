import Navbar from "../components/Navbar"

const SetupInstructions = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="font-bold text-3xl lg:text-5xl mb-4">PWA Setup Instructions</h1>
        <p className="text-gray-600 mb-10">
          This website can be added to your home screen to behave just like an app (PWA).
          To setup AnchorEats to act like an app, follow the instructions for your device below. This website can also be 
          used as a regular website in the browser if desired.
        </p>

        <div className="mb-10">
          <h2 className="font-semibold text-xl mb-4">iPhone / iPad</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-800">
            <li>Open AnchorEats in Safari</li>
            <li>Tap the Share button</li>
            <li>Choose <span className="font-medium">Add to Home Screen</span></li>
            <li>Tap <span className="font-medium">Add</span></li>
          </ol>
        </div>

        <div className="mb-10">
          <h2 className="font-semibold text-xl mb-4">Android</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-800">
            <li>Open AnchorEats in Chrome</li>
            <li>Tap <span className="font-medium">Install app</span> if prompted, or open the browser menu</li>
            <li>Choose <span className="font-medium">Add to Home Screen</span> or <span className="font-medium">Install app</span></li>
            <li>Confirm <span className="font-medium">Install</span></li>
          </ol>
        </div>

        <p className="text-gray-600 text-sm">
          The app will be added to your device's home screen. This can be undone at any time by selecting the app on the home screen and selecting <span className="font-medium">Delete Bookmark</span>.
        </p>
      </div>
    </div>
  )
}

export default SetupInstructions
