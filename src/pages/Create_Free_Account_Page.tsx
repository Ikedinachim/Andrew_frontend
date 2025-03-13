import { useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
const CreateFreeAcountPage = (props) => {
  let navigate = useNavigate()
  let nameRef = useRef()
  let passwordRef = useRef()
  let cPasswordRef = useRef()
  const [errormessage, setErrorMessage] = useState('')
  const location = useLocation();
  const email = location.state?.email;
  const validateForm = () => {
    // Get values from refs
    const name = nameRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const confirmPassword = cPasswordRef.current?.value || '';
    
  
    // Check if fields are empty
    if (!name.trim()) {
      setErrorMessage('Please enter your name');
      return false;
    }
  
    if (!password) {
      setErrorMessage('Please enter a password');
      return false;
    }
  
    if (!confirmPassword) {
      setErrorMessage('Please confirm your password');
      return false;
    }
  
    // Password validation rules
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        'Password must contain at least 8 characters, including uppercase, lowercase, number and special character'
      );
      return false;
    }
  
    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }
  
    // If all validations pass
    setErrorMessage(''); // Clear any error messages
    return true;
  };
  const verifyHandler = () => {
    const name = nameRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    if (validateForm()) {
      axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/signup`, { email, name, password })
      .then(response => {
        console.log(response.data);
        navigate('/onboarding-goals', { 
          state: { email: email }
        });
      })
      .catch(error => {
        console.error(error);
        setErrorMessage(error.response.data.message)
      });

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
                Create your free account
              </h3>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 text-center">
              Let’s enter some details for xyz@gmail.com
            </p>
          </div>
          <div>

            <p className="font-semibold text-base col mb-0">Your name</p>
            <div className="rounded-md shadow-sm space-y-4">

              <label htmlFor="email" className="sr-only">name</label>
              <input
                id="name"
                name="name"
                type="text"
                ref={nameRef}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />

            </div>
          </div>
          <div>

            <p className="font-semibold text-base col mb-0">Password</p>
            <div className="rounded-md shadow-sm space-y-4">

              <label htmlFor="email" className="sr-only">Password</label>
              <input
                id="Password"
                name="Password"
                type="password"
                required
                ref={passwordRef}
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
                ref={cPasswordRef}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />

            </div>
          </div>
          {errormessage && <p className="text-red-500 text-sm">{errormessage}</p>}
          <div>
            <button
              type="submit"
              onClick={() => {verifyHandler()}}
              className="group mx-auto relative w-[80%] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#040BC5] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">By creating an account, you agree to the Terms & Conditions. </span>

          </div>
        </div>

      </div>
    </div>
  )

}
export default CreateFreeAcountPage