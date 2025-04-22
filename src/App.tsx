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
import FOTP_VerificationPage from './pages/FOTP_VerificationPage';
import Dashboard from './pages/Dashboard';
import AddNewCoursePage from './pages/Add_New_Course_Page';
import ViewCoursePage from './pages/ViewCoursePage';
import AppLayout from './pages/AppLayout';
import CourseDetailsPage from './pages/CourseDetailsPage';
import ModuleDetailsPage from './pages/ModuleDetailsPage';
import ModuleDetailsNewStart from './pages/ModuleDetailsNewStart';
import ModuleDetailsContinue from './pages/ModuleDetailsContinue';
import OpenEndedPage from './pages/OpenEndedPage';
import PerformanceReportPage from './pages/PerformanceReportPage';
import QuizPerformanceReport from './pages/QuizPerformanceReport';
import ViewModules from './pages/ViewModules';
import MCQPage from './pages/Mcq_page';
import UserProfile from './pages/UserProfile';
import UserProfileLayout from './pages/UserProfileLayout';
import UserProfileLearningStats from './pages/UserProfileLearningStats';
import EditNewCoursePage from './pages/EditNewCoursePage';
import BlankDashboard from './pages/BlankDashboard';

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/onboarding-goals" element={<OnboardingGoals />} />
      <Route path="/otp-verification" element={<OTP_VerificationPage />} />
      <Route path="/fotp-verification" element={<FOTP_VerificationPage />} />
      <Route path="/create-free-account" element={<CreateFreeAcountPage />} />
      <Route path="/choose-new-password" element={<ChooseNewPassword />} />
      <Route path="/sign-in" element={<SigninPage />} />
      <Route path="/sign-up" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/mcq-page" element={<MCQPage />} />
      <Route path="/open-ended-page" element={<OpenEndedPage />} />
      <Route path="/dashboard" element={<AppLayout />} >
        <Route index element={<Dashboard />} />
        <Route path="/dashboard/view-courses" element={<ViewCoursePage />} />
        <Route path="/dashboard/add-new-course" element={<AddNewCoursePage />} />
        <Route path="/dashboard/edit-new-course" element={<EditNewCoursePage />} />
        <Route path="/dashboard/view-modules" element={<ViewModules />} />
        <Route path="/dashboard/course-details/:id" element={<CourseDetailsPage />} />
        <Route path="/dashboard/module-details/:id" element={<ModuleDetailsPage />} />
        <Route path="/dashboard/performance-report" element={<PerformanceReportPage />} />
        <Route path="/dashboard/quiz-performance-report/:id" element={<QuizPerformanceReport />} />
        <Route path="/dashboard/module-details-new-start" element={<ModuleDetailsNewStart />} />
        <Route path="/dashboard/module-details-continue" element={<ModuleDetailsContinue />} />
        <Route path="/dashboard/user-profile" element={<UserProfileLayout />} >
        <Route path="/dashboard/user-profile/learning-stats" element={<UserProfileLearningStats />} />
        <Route index element={<UserProfile />} />
      
        </Route>
      </Route>
    </Routes>
  );
}



export default App;