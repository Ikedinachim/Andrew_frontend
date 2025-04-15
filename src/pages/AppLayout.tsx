import React from 'react';
import StreakCard from '../components/StreakCard';
import SideBar from '../components/SideBar';
import Topbar from '../components/TopBar';
import ProgressCard from '../components/ProgressCard';
import NewCourseCard from '../components/NewCourseCard';
import RecentActivityCard from '../components/RecentActivityCard';
import RecommendationCard from '../components/RecommendationCard';
import GreetingCard from '../components/GreetingCard';
import { Outlet } from 'react-router-dom';

const AppLayout: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  const toggleDrawer = () => {
    setIsOpen(true);
  };

  return (
    <div className="max-h-screen max-w-screen w-screen h-screen bg-white">
      <div className="flex flex-row  transition-all duration-300 ease-in-out">
        {/* Navigation Drawer */}
        <div
          className={`
             bg-[#F3F5F9] px-[24px] py-[2px] min-h-screen border-r border-[#ABAEEC] shadow-lg transition-all duration-300 ease-in-out
            ${isOpen ? 'w-[308px]' : 'w-[0] hidden'}
          `}
        >
          {/* Sidebar Content */}
          {isOpen && (
            <SideBar toggleDrawer={toggleDrawer} />
          )}
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${isOpen ? 'ml-[0px] p-6' : 'ml-0 p-12 pt-6'
            }`}
        >
          {/* Menu Icon (Appears when Sidebar is Closed) */}
          <img
            src="../../public/assets/bi_filter.svg"
            alt="Menu Toggle"
            onClick={toggleDrawer}
            className={`cursor-pointer z-50 fixed top-[27px] left-[12px] ${isOpen ? 'hidden' : 'block'
              }`}
          />

          <Topbar />

          <Outlet />

          
          
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
