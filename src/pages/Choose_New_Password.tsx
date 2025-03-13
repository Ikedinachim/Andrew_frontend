import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useRef } from "react";
const ChooseNewPassword = (props) => {
  let navigate = useNavigate()
  const [errormessage, setErrorMessage] = useState('')
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const location = useLocation();

  const email = location.state?.email;
  const otp = location.state?.otp;
  const saveNewPasswordHandler = () => {
    const password = passwordRef.current?.value || '';
    const confirmPassword = confirmPasswordRef.current?.value || '';
    if (password === confirmPassword) {
      axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/reset-password`, { email, newPassword: password, otp: +otp })
        .then(response => {
          console.log(response.data);
          navigate('/dashboard');
        })
        .catch(error => {
          console.error(error);
          setErrorMessage(error.response.data.message)
        });
    } else {
      setErrorMessage('Passwords do not match');
    }

  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="mt-8 space-y-6 ">
          <div className="flex items-center mb-2">
            <button
              onClick={() => props.setShowAuth(false)}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
            </button>
            <div className="flex-grow flex justify-center items-center">
              <h3 className="ml-2 text-center text-2xl font-semibold text-gray-900">
                Choose A New Password
              </h3>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 text-center">
              Enter the new password for the account shikharpokharel1999@gmail.com
            </p>
          </div>

          <div>

            <p className="font-semibold text-base col mb-0">Password</p>
            <div className="rounded-md shadow-sm space-y-4">

              <label htmlFor="email" className="sr-only">Password</label>
              <input
                id="Password"
                name="Password"
                type="password"
                ref= {passwordRef}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />

            </div>
          </div>

          <div>

            <p className="font-semibold text-base col mb-0">Confirm Password</p>
            <div className="rounded-md shadow-sm space-y-4">

              <label htmlFor="cpassword" className="sr-only">cpassword</label>
              <input
                id="cpassword"
                name="cpassword"
                type="password"
                ref={confirmPasswordRef}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />

            </div>
          </div>
          {errormessage && <p className="text-red-500 text-sm">{errormessage}</p>}
          <div>
            <button
            onClick={saveNewPasswordHandler}
              type="submit"
              className="group mx-auto relative w-[80%] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#040BC5] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save New Password
            </button>
          </div>


        </div>

      </div>
    </div>
  )

}
export default ChooseNewPassword