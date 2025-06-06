import React, { useRef } from 'react';
import OTPInput from '../components/OTPInput';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';


const FOTP_VerificationPage = (props) => {
    const [otp, setOtpValue] = useState('');
    let navigate = useNavigate()
    const location = useLocation();
    const [errormessage, setErrorMessage] = useState('')
    const email = location.state?.email;
   

  // Add a check to handle cases where email might be missing
  if (!email) {
    return <Navigate to="/forgot-password" replace />;
  }
  


    const verifyHandler = () => {
        
        if (otp.length < 6) {
            setErrorMessage('Please enter a valid OTP');
            return;
        }
        navigate('/choose-new-password', { 
          state: { email: email,otp:otp }
        });
     
    };
    
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[48rem] w-full space-y-8 ">
                <div className="mt-8 space-y-6">
                    <div className="flex-col items-center justify-center mb-2 ">
                        {/* <button
                            onClick={() => props.setShowAuth(false)}
                            className="mr-4 text-gray-500 hover:text-gray-700"
                        >
                        </button> */}
                        <div className="flex-grow flex justify-center items-center">
                            <h3 className="text-center text-2xl font-semibold text-gray-900">
                                OTP Verification
                            </h3>
                        </div>
                        
                            <p className="text-sm text-[#AAAAAA] text-center mb-10 max-w-sm mx-auto">
                                A 6-digit verification has been sent to your {email}, please enter it here.
                            </p>
                        
                    </div>
                    <div>
                        <OTPInput length={6} onComplete={(otp) => setOtpValue(otp)} />
                    </div>
                    {errormessage && <p className="text-red-500 text-sm">{errormessage}</p>}             
                    <div>
                        <button
                            onClick={() => verifyHandler()}
                            type="submit"
                            className="group mx-auto relative w-[40%] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#040BC5] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Verify
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default FOTP_VerificationPage;