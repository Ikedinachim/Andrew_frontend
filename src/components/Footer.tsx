import { Brain, Github, Linkedin, Twitter } from "lucide-react"

      
      {/* Footer */}
      const Footer = (props) => {
        return (
            <footer className="bg-gray-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center">
                    <Brain className="h-8 w-8 text-indigo-400" />
                    <span className="ml-2 text-xl font-bold text-white">Andrew</span>
                  </div>
                  <p className="mt-2 text-gray-400">Your AI-powered study companion</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                    <li><a href="#how-it-works" className="text-gray-400 hover:text-white">How it Works</a></li>
                    <li><a href="#testimonials" className="text-gray-400 hover:text-white">Testimonials</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white">
                      <Twitter className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      <Github className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      <Linkedin className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 border-t border-gray-700 pt-8">
                <p className="text-center text-gray-400">&copy; {new Date().getFullYear()} Andrew AI. All rights reserved.</p>
              </div>
            </div>
          </footer>
        )
      }

export default Footer
     