import { Brain } from "lucide-react";

const Navbar = (props) => {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Andrew</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-600 hover:text-indigo-600">Features</a>
                <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600">How it Works</a>
                <a href="#testimonials" className="text-gray-600 hover:text-indigo-600">Testimonials</a>
                <button 
                  onClick={() => {
                    props.handleGetStarted()
                  }} 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav> 
    )
}

export default Navbar