import React, { useState } from 'react';
import { BookOpen, Brain, BarChart3, Upload, Calendar, Award} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SigninPage from './SigninPage';
import SignupPage from './SignupPage';
import ForgotPasswordPage from './ForgotPasswordPage';
function LandingPage() {
    const [showAuth, setShowAuth] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
    let navigate = useNavigate()
    const handleGetStarted = () => {
      setShowAuth(true);
      setAuthMode('signup');
      navigate('/sign-up');
    };
  
    // if (showAuth) {
    //   return (
    //     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    //       <div className="max-w-md w-full space-y-8">
            
  
    //         {authMode === 'login' && (
    //           <SigninPage setAuthMode = {setAuthMode} />
    //         )}
  
    //         {authMode === 'signup' && (
    //           <SignupPage setAuthMode = {setAuthMode} />
    //         )}
  
    //         {authMode === 'forgot' && (
    //           <ForgotPasswordPage setAuthMode = {setAuthMode} />
    //         )}
    //       </div>
    //     </div>
    //   );
    // }
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar handleGetStarted = {handleGetStarted} />
  
        {/* Hero Section */}
        <div className="relative h-screen flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Your Personal</span>
                <span className="block text-indigo-600">AI Study Assistant</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Transform your learning experience with personalized study plans, AI-generated quizzes, and intelligent progress tracking.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <button 
                    onClick={handleGetStarted}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Start Learning
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Video Section */}
        <div className="h-screen flex items-center justify-center bg-gray-50" id='how-it-works'>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-8">See Andrew in Action</h2>
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-[600px] bg-gray-200 rounded-lg flex items-center justify-center">
                <iframe width="1280" height="620" src="https://www.youtube.com/embed/DcpZH8tUEic?autoplay=1" title="Andrew AI Assistant" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                  {/* <span className="text-gray-500">Demo Video Placeholder</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Features Section */}
        <div className="min-h-screen flex items-center justify-center py-16" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-12">Features that Empower Your Learning</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Upload className="h-8 w-8 text-indigo-600" />}
                title="Easy Material Upload"
                description="Upload your study materials in any format and let Andrew analyze them for you."
              />
              <FeatureCard
                icon={<Calendar className="h-8 w-8 text-indigo-600" />}
                title="Personalized Learning Plans"
                description="Get customized study schedules based on your goals and learning style."
              />
              <FeatureCard
                icon={<BookOpen className="h-8 w-8 text-indigo-600" />}
                title="AI-Generated Quizzes"
                description="Practice with intelligent quizzes that adapt to your knowledge level."
              />
              <FeatureCard
                icon={<BarChart3 className="h-8 w-8 text-indigo-600" />}
                title="Progress Tracking"
                description="Monitor your improvement with detailed analytics and insights."
              />
              <FeatureCard
                icon={<Brain className="h-8 w-8 text-indigo-600" />}
                title="Smart Recommendations"
                description="Receive targeted suggestions for areas that need more attention."
              />
              <FeatureCard
                icon={<Award className="h-8 w-8 text-indigo-600" />}
                title="Performance Review"
                description="Get comprehensive feedback on your learning journey."
              />
            </div>
          </div>
        </div>
  
        {/* Testimonials Section */}
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-16" id="testimonials">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900">What Our Students Say</h2>
              <p className="mt-4 text-xl text-gray-600">Join thousands of successful learners who transformed their study habits with Andrew</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                name="Sarah Johnson"
                role="Medical Student"
                image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                rating={5}
                text="Andrew has completely transformed how I study for my medical exams. The AI-generated quizzes are incredibly helpful and the personalized study plans keep me on track."
              />
              <TestimonialCard
                name="Michael Chen"
                role="Computer Science Major"
                image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                rating={4.5}
                text="The smart recommendations feature is a game-changer. It helped me identify and focus on my weak areas in programming concepts. My grades have improved significantly!"
              />
              <TestimonialCard
                name="Emily Rodriguez"
                role="Law Student"
                image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
                rating={5}
                text="Preparing for the bar exam was daunting, but Andrew made it manageable. The ability to upload and analyze study materials saved me countless hours of preparation time."
              />
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
  
  
  
  export default LandingPage;