import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useRef, useState } from "react";
const ForgotPasswordPage = (props) => {
  let navigate = useNavigate()
  const emailRef = useRef()
  const [errormessage, setErrorMessage] = useState('')
  const handleSendOTP = () => {
    let email = emailRef.current.value;
    axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/forgot-password`, { email })
      .then(response => {
        console.log(response.data);
        navigate('/fotp-verification', {
          state: { email: email}
        });
      })
      .catch(error => {
        console.error(error);
        setErrorMessage(error.response.data.message)
      });
  };



  const handleBackToLogin = () => {
    navigate(-1)
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="mt-8 space-y-6">
          <div className="flex items-center mb-2">
            <button
              onClick={() => props.setShowAuth(false)}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
            </button>
            <div className="flex-grow flex justify-center items-center">
              <h3 className="ml-2 text-center text-2xl font-semibold text-gray-900">
                Forgot your password?
              </h3>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 text-center">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <p className="font-semibold text-base col">Email address</p>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                ref = {emailRef}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="jane@example.com"
              />
            </div>
          </div>
          {errormessage && <p className="text-red-500 text-sm">{errormessage}</p>}
          <div>
            <button
              onClick={() => handleSendOTP()}
              type="submit"
              className="group mx-auto relative w-[80%] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#040BC5] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send OTP
            </button>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">Remember your password? </span>
            <button
              onClick={() => handleBackToLogin()}
              className=" underline text-sm font-medium text-black hover:text-[#040BC5]"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )

}
export default ForgotPasswordPage