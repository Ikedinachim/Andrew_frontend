import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, BarChart3, Upload, Calendar, Award, HeartOff, Link, Section} from 'lucide-react';
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

  // function handleClick(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
  //   throw new Error('Function not implemented.');
  // }

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

    // Features Carousel Config
    const CarouselSection = () => {
      const slides = [
        {
          title: 'Personalized Study Plans',
          subtitle: 'Upload your materials, and AI will structure your learning journey into digestible modules.',
          image: './src/assets/Carousel1.svg',
        },
        {
          title: 'Unlimited AI-Generated Quizzes',
          subtitle: 'Test your knowledge with dynamic quizzes and detailed reports on strengths and weaknesses',
          image: './src/assets/Carousel2.svg',
        },
        {
          title: 'Smart Progress Tracking',
          subtitle: 'Real time insights into your learning journey with AI-powered analytics and recommendations',
          image: './src/assets/Carousel3.svg',
        },
        {
          title: 'AI-Driven Study Recommendations',
          subtitle: 'Targeted learning suggestions, including relevant pages and topics from your materials and external resources',
          image: './src/assets/Carousel4.svg',
        },
        {
          title: 'Key Performance Insights',
          subtitle: 'Get detailed reports on your quiz performance, strength areas, and where to focus next to master the topic',
          image: './src/assets/Carousel5.svg',
        },
        {
          title: 'Seamless Integrations',
          subtitle: 'Works with PDFs, docs, audio and video files, and online materials for a truly immersive learning experience',
          image: './src/assets/Carousel6.svg',
        },
      ];

      const [activeIndex, setActiveIndex] = useState(0);

      // Auto-scroll functionality
      useEffect(() => {
        const interval = setInterval(() => {
          setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 10000); 

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
      }, []);

      return (
        <div className="w-full px-6 sm:px-12 py-16 bg-[#f3f5f9]">
          <div className="max-w-6xl mx-auto flex items-center justify-between mt-4">
            {/* Carousel Content */}
            <div className="flex flex-col items-center text-center flex-1 space-y-4">
            <h4 className="text-3xl font-bold text-[#333333]">
              <span className="text-[#333333]">{slides[activeIndex].title.split(' ')[0]}</span>
              <span className="text-[#040BC5]"> {slides[activeIndex].title.split(' ').slice(1).join(' ')}</span>
            </h4>
              <p className="text-[#333333] max-w-lg mt-2">
                {slides[activeIndex].subtitle}
              </p>
              <img
                src={slides[activeIndex].image}
                alt={slides[activeIndex].title}
                className="w-200 h-auto object-contain"
              />
            </div>

            {/* Scroll Indicator */}
            <div className="flex flex-col items-center justify-center space-y-4 pl-6">
              {/* Carousel Control */}
              <div className="flex flex-col items-center justify-center space-y-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      i === activeIndex ? 'bg-[#040BC5]' : 'bg-[#CDCEF3]'
                    } hover:cursor-pointer`}
                  />
                ))}
              </div>

              {/* Scroll Indicator */}
              <div className="w-6 h-10 rounded-full border-1 border-[#040BC5] bg-transparent mb-4 mt-3 pt-2 flex items-top justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#30538B]"></div>
              </div>
            </div>

          </div>
        
        </div>
      );
    };

    // Main Landing Page Content
    return (
      <>
        {/* Hero Section */}
        <div
          className="w-full relative overflow-hidden"
          style={{
            background: 'linear-gradient(104deg, #EEF2F6 25.5%, #FFF 39%, #EEF2F6 49%, #FFF 55%, #EEF2F6 59%)',
          }}
        >
          {/* NavBar */}
          <nav className="flex flex-col sm:flex-row items-center justify-between px-6 sm:px-8 py-4 space-y-4 sm:space-y-0">
            <a href="/"><img src="./src/assets/logo.svg" alt="Andrew AI" /></a>
            {/* <div className="text-2xl font-bold text-[#040BC5]">ANDREW</div> */}
            <div className="flex space-x-10 items-center">
              <a
                href="/"
                className="text-[#333333] hover:text-[#040BC5] hover:underline underline-offset-4 font-medium transition cursor-pointer"
              >
                Home
              </a>
              <a
                href='#features'
                className="text-[#333333] hover:text-[#040BC5] hover:underline underline-offset-4 font-medium transition cursor-pointer"
              >
                Features
              </a>
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center px-6 py-2 text-sm font-semibold text-white bg-[#585CD8] border border-[#585CD8] rounded-3xl hover:bg-[#ABAEEC] hover:border-[#585CD8] hover:rounded-[40px] hover:shadow-md transition-all duration-300 cursor-pointer"
                style={{ boxShadow: '0px 3px 15px 0px rgba(0, 0, 0, 0.10)' }}
              >
                Get Started
              </button>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="flex flex-col items-center justify-center text-center flex-grow px-6 sm:px-12 pt-7">
            <div className="max-w-4xl w-full">
              <h1 className="text-3xl sm:text-5xl font-semibold text-[#333333] leading-snug sm:leading-tight mt-8 px-2 sm:px-0">
                Learn Smarter Not Harder – Your AI-Powered Learning Companion
              </h1>
              <p className="text-sm sm:text-md text-[#333333] my-6 max-w-2xl w-full mx-auto px-2 sm:px-0">
                <strong>Create courses, upload materials, and let AI guide your learning journey.</strong>{' '}
                Get structured learning paths, take unlimited AI-generated quizzes, and receive smart recommendations to master any subject faster and more efficiently!
              </p>
              {/* Action Button */}
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center px-6 py-3 mt-6 text-lg font-semibold text-white bg-[#585CD8] hover:bg-[#040BC5] border rounded-xl shadow-md border-[#585CD8] transition-all duration-300 cursor-pointer"
                style={{ boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.10)' }}
              >
                Get Started Free
              </button>
            </div>

            {/* Screenshot Image */}
            <img
              src="./src/assets/DashboardScreen.svg"
              alt="Dashboard"
              className="mt-16 w-full max-w-4xl mx-auto rounded-t-lg z-10 object-contain px-4 sm:px-0"
            />

          </div>

          {/* Overlapping Circles*/}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-4 z-0">
            <img src="./src/assets/BgCircle1.svg" alt="Circle 1" className="w-250 h-90" />
            <img src="./src/assets/BgCircle2.svg" alt="Circle 2" className="w-250 h-90 -ml-24" />
          </div>
        </div>
        
        {/* Section 2: About Andrew */}
        <div className="w-full px-6 sm:px-12 py-16 border-y border-[#E0E0E0]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Left Column – Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#333333] leading-snug py-8 sm:pl-6 sm:">
                Personalized Learning Tailored Just for You
              </h1>
            </div>

            {/* Right Column – Text + Button */}
            <div>
              <p className="text-[#333333] text-base sm:text-lg mb-6 sm:pt-3 sm:pl-3">
                For students, educators, and lifelong learners. No generic lessons - just smart, adaptive learning designed for YOU.
              </p>
              <p className="text-[#333333] text-base sm:text-lg mb-6 font-semibold mt-6 sm:pl-3">
                Sign up now and unlock a new way to learn - faster, smarter, and more efficiently
              </p>
              
              {/* Action button */}
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-[#333333] border-2 border-white bg-white hover:text-[#040BC5] hover:border-[#040BC5] rounded-3xl shadow-md transition duration-300 cursor-pointer mt-4 sm:ml-3"
                style={{ boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.10)' }}
              >
                Discover Our Platform
              </button>
            </div>
          </div>
        </div>
        
        {/* Section 3: Why Andrew?*/}
        <div className="w-full px-6 sm:px-12 py-16 text-center mb-8" id="features">
          <h3 className="text-2xl sm:text-3xl md:text-4xl text-[#333333] my-6 font-medium">
            Why Choose Andrew?
          </h3>
          <p className="text-[#333333] text-sm sm:text-base pt-3 max-w-3xl sm:max-w-4xl mx-auto">
            Ditch the outdated, one-size-fits-all learning experience! Our platform adapts to your pace, strengths, and weak spots giving you exactly what you need to succeed.
          </p>
        </div>

        {/* Features Carousel */}
        <CarouselSection />
        
        {/* Section 4: How it works */}
        <div className="w-full px-6 sm:px-12 py-16 text-center flex flex-col items-center justify-center">
          <p className='bg-[#CDCEF3] text-[#040CB5] text-xs rounded-2xl text py-1 px-3 font-medium mb-4'>
            Super Simple
          </p>
          <h3 className="text-3xl sm:text-3xl text-[#333333] font-semibold mb-12">
            How It Works
          </h3>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-6 mx-auto px-6 max-w-7xl">
            {/* Card 1 */}
            <div className="bg-white shadow-lg p-12 rounded-xl flex flex-col items-center justify-center">
              <div className="w-8 h-8 bg-[#CDCEF3] text-[#040CB5] rounded-full flex items-center justify-center mb-4 text-lg">
                1
              </div>
              <h4 className="text-lg font-medium text-[#333333] mb-4">Sign In/Sign Up</h4>
              <p className="text-xs text-[#AAAAAA] text-center">
                Sign in/Sign up with email or google
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow-lg p-12 rounded-xl flex flex-col items-center justify-center">
              <div className="w-8 h-8 bg-[#CDCEF3] text-[#040CB5] rounded-full flex items-center justify-center mb-4 text-lg">
                2
              </div>
              <h4 className="text-lg font-medium text-[#333333] mb-4">Create a Course</h4>
              <p className="text-xs text-[#AAAAAA] text-center">
                Create a course and upload learning materials <br/>(PDFs, Docs, Audio, Video, etc.)
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow-lg p-12 rounded-xl flex flex-col items-center justify-center">
              <div className="w-8 h-8 bg-[#CDCEF3] text-[#040CB5] rounded-full flex items-center justify-center mb-4 text-lg">
                3
              </div>
              <h4 className="text-lg font-medium text-[#333333] mb-4">AI Generates Modules</h4>
              <p className="text-xs text-[#AAAAAA] text-center">
                Andrew extracts key topics from materials and <br/>organizes them into digestible study units.
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-6 mx-auto px-6 max-w-7xl mt-6">
            {/* Card 4 */}
            <div className="bg-white shadow-lg p-12 rounded-xl flex flex-col items-center justify-center">
              <div className="w-8 h-8 bg-[#CDCEF3] text-[#040CB5] rounded-full flex items-center justify-center mb-4 text-lg">
                4
              </div>
              <h4 className="text-lg font-medium text-[#333333] mb-4">Take AI Generated Quizzes</h4>
              <p className="text-xs text-[#AAAAAA] text-center">
                Test and reinforce your knowledge with dynamic <br /> quizzes (MCQs, pen-ended, etc.).
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white shadow-lg p-12 rounded-xl flex flex-col items-center justify-center">
              <div className="w-8 h-8 bg-[#CDCEF3] text-[#040CB5] rounded-full flex items-center justify-center mb-4 text-lg">
                5
              </div>
              <h4 className="text-lg font-medium text-[#333333] mb-4">Get Smart Insights</h4>
              <p className="text-xs text-[#AAAAAA] text-center">
                Quiz reports, knowledge gap analysis & <br />targeted study recommendations.
              </p>
            </div>
          </div>
          
          {/* Call to Action */}
          <div>
            <p className="text-2xl sm:text-2xl text-[#333333] font-normal mt-16">
              Learn at your own pace, with AI as your personal tutor!
            </p>
            <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center px-6 py-2 text-sm font-semibold text-[#333333] border-2 border-white bg-white hover:text-[#040BC5] hover:border-[#040BC5] rounded-3xl shadow-md transition duration-300 cursor-pointer mt-4 mb-6"
                style={{ boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.10)' }}
              >
                Start Learning Smarter Today
              </button>
          </div>
          
        </div>
      
        {/* Section 5: Target Users */}
        <div className="w-full px-6 sm:px-12 py-16 text-center flex flex-col items-center justify-center bg-[#F3F5F9]">
          <p className="bg-[#CDCEF3] text-[#040CB5] text-xs rounded-2xl py-1 px-3 font-medium mb-4">
            Target Audience
          </p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl text-[#333333] font-semibold mb-12">
            Who Is Andrew For?
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl w-full px-4 sm:px-8">
            {/* Card 1 */}
            <div className="bg-white shadow-lg p-8 sm:p-10 rounded-xl flex flex-col items-center justify-center">
              <img src="../../src/assets/Student.png" alt="Students" className="mb-4 w-24 h-auto" />
              <h4 className="text-base font-medium text-[#333333] mb-3">Students</h4>
              <p className="text-sm text-[#AAAAAA]">
                Master subjects and prepare for exams with AI-powered study guidance.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow-lg p-8 sm:p-10 rounded-xl flex flex-col items-center text-center">
              <img src="../../src/assets/Professional 1.png" alt="Teachers" className="mb-4 w-24 h-auto" />
              <h4 className="text-base font-medium text-[#333333] mb-3">Teachers</h4>
              <p className="text-sm text-[#AAAAAA]">
                Structure course materials for your students and generate dynamic quizzes.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow-lg p-8 sm:p-10 rounded-xl flex flex-col items-center text-center">
              <img src="../../src/assets/Lifelong leraner 1.png" alt="Lifelong Learners" className="mb-4 w-24 h-auto" />
              <h4 className="text-base font-medium text-[#333333] mb-3">Lifelong Learners</h4>
              <p className="text-sm text-[#AAAAAA]">
                Personalize your learning experience with AI support, insights, and recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Call To Action */}
        <div className="w-full px-6 sm:px-12 py-16 text-center flex flex-col items-center justify-center bg-[#020663]">
          <h3 className="text-4xl sm:text-4xl text-white my-6 font-light">
            Transform the way you learn - the future of education is here!
          </h3>
          <p className="text-white text-base max-w-4xl mx-auto font-light">
            Ready to experience AI-driven learning? Sign up and start your personalized journey today.
          </p>
          <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-[#333333] border-2 border-white bg-white hover:text-[#040BC5] hover:border-[#040BC5] rounded-3xl shadow-md transition duration-300 cursor-pointer mt-12 mb-8"
                style={{ boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.10)' }}
              >
                Sign Up & Learn Smarter
              </button>
        </div>

        {/* Section 7: Footer */}
        <div className="w-full py-16 border-y border-[#E0E0E0] bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 px-6 sm:px-12 items-center">
            
            <div>
              <p className="text-2xl sm:text-3xl font-medium text-[#333333] leading-snug mb-6">
                <span>Trusted by </span>
                <span className="text-[#040BC5]">Students & Professionals<br />Worldwide</span>
              </p>
              <ul className="text-[#AAAAAA] text-sm list-disc pl-5 space-y-2">
                <li>Powered by cutting-edge AI technology</li>
                <li>Used by learners across top universities and industries</li>
                <li>Backed by research-driven study techniques</li>
              </ul>
            </div>

            <div className="flex justify-center md:justify-end">
              <img src="./src/assets/SFBU.svg" alt="Partner Logo" className="w-96 sm:w-56 md:w-96 h-auto" />
            </div>
          </div>
        </div>
      </>
    );
  };
  
  
  
  export default LandingPage;