import { FcGoogle } from "react-icons/fc";
import  {useNavigate} from "react-router-dom"
import { useRef, useState } from "react";
import axios from 'axios'
const SignupPage = (props) => {
  let navigate = useNavigate()
  const emailRef = useRef()
  const [errormessage, setErrorMessage] = useState('')
  const handleSignUp = () => {
    // http request for email verification
    let email = emailRef.current.value;
    axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/request-email-verification`, { email })
      .then(response => {
        console.log(response.data);
        navigate('/otp-verification', { 
          state: { email: email }
        });
      })
      .catch(error => {
        console.error(error);
        setErrorMessage(error.response.data.message)
      });
    };

  const handleLogIn = () => {
    navigate('/sign-in');
  
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
    <div className="mt-8 space-y-6">
      <div className="flex items-center">
              <button 
                onClick={() => props.setShowAuth(false)} 
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
              </button>
              <div className="flex-grow flex justify-center items-center">
                <h3 className="ml-2 text-center text-2xl font-semibold text-gray-900">
                  Welcome to E-learning
                </h3>
              </div>
            </div>
      <button className="rounded-[10px] w-full border shadow-md border-[#AAAAAA] flex items-center justify-center py-3">
        <FcGoogle className="text-2xl ml-1" />
        <h4 className="text-base font-sans font-semibold">Continue with Google</h4>
      </button>

      <div className="relative flex  items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-2 text-[12px] text-gray-400">or</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
      <div className="rounded-md shadow-sm space-y-4">

        <div>
          <p className="font-semibold text-base col">Email address</p>
          <label htmlFor="email" className="sr-only">jane@example.com</label>
          <input
            id="email"
            ref={emailRef}
            name="email"
            type="email"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="jane@example.com"
          />
        </div>

      </div>
      {errormessage && <p className="text-red-500 text-sm">{errormessage}</p>}
      <div>
        <button
          onClick={() => handleSignUp()}
          type="submit"
          className="group relative w-[80%] mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#040BC5] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign up
        </button>
      </div>

      <div className="text-center">
        <span className="text-sm text-gray-600">Already have an account? </span>
        <button
          onClick={() => handleLogIn()}
          className="text-sm font-medium text-black hover:text-indigo-500 underline"
        >
          Log in
        </button>
      </div>
    </div>
    </div>
    </div>
  )

}

export default SignupPage