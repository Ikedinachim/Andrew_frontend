import React from 'react';
import StreakCard from '../components/StreakCard';
import SideBar from '../components/SideBar';
import Topbar from '../components/TopBar';
import ProgressCard from '../components/ProgressCard';
import NewCourseCard from '../components/NewCourseCard';
import RecentActivityCard from '../components/RecentActivityCard';
import RecommendationCard from '../components/RecommendationCard';
import GreetingCard from '../components/GreetingCard';

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>



      <GreetingCard />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Course Cards */}
          <ProgressCard />
          <NewCourseCard />
          <NewCourseCard />
          <NewCourseCard />
          <NewCourseCard />

        </div>
        {/* Sidebar Right */}
        <div>
          <RecentActivityCard />
          <StreakCard />

          <RecommendationCard />
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
