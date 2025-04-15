import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, resetUserStatus, signIn } from "../features/userSlice";
const SigninPage = (props) => {
  let navigate = useNavigate()
  const [errormessage, setErrorMessage] = useState('')
  const emailRef = useRef()
  const passwordRef = useRef()
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (status == 'success') {
      navigate('/dashboard');
      dispatch(resetUserStatus())
    }
  }, [user, navigate]);

  const handleSignIn = async (e) => {
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    dispatch(signIn({ email, password }));
    dispatch(getUserProfile())
    console.log(status, user);
    
   
   
    
    // axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, { email, password })
    //   .then(response => {
    //     console.log(response.data);
    //     navigate('/dashboard');
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     setErrorMessage(error.response.data.message)
    //   });
  };
    
  

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };
  {status === 'loading' && <p className="text-blue-500">Signing in...</p>}
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


          <div>
            <p className="font-semibold text-base col">Email address</p>
            <label htmlFor="email" className="sr-only">jane@example.com</label>
            <input
              id="email"
              name="email"
              type="email"
              ref={emailRef}
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="jane@example.com"
            />
          </div>
          <div>
            <p className="font-semibold text-base col">Password</p>
            <label htmlFor="password" className="sr-only">jane@example.com</label>
            <input
              id="password"
              name="password"
              type="password"
              ref={passwordRef}
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>

          {errormessage && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button
                onClick={() => handleForgotPassword()}
                className="font-medium text-black hover:text-[#040BC5] underline"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div>
            <button
              onClick={() => handleSignIn()}
              type="submit"
              className="group mx-auto relative w-[80%] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#040BC5] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">Don't have an account? </span>
            <button
              onClick={() => handleSignUp()}
              className="text-sm font-medium underline text-black hover:text-[#040BC5]"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default SigninPage