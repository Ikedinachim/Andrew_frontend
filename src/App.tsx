import React from 'react';

import LandingPage from './pages/LandingPage';
import OTP_VerificationPage from './pages/OTP_VerificationPage';
import OnboardingGoals from './pages/Onboarding_Goals';
import CreateFreeAcountPage from './pages/Create_Free_Account_Page';
import ChooseNewPassword from './pages/Choose_New_Password';
import { Routes, Route } from 'react-router-dom';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/otp-verification" element={<OTP_VerificationPage />} />
      <Route path="/onboarding-goals" element={<OnboardingGoals />} />
      <Route path="/create-free-account" element={<CreateFreeAcountPage />} />
      <Route path="/choose-new-password" element={<ChooseNewPassword />} />
      <Route path="/sign-in" element={<SigninPage />} />
      <Route path="/sign-up" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    </Routes>
  );
}



export default App;