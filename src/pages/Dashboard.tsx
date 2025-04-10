import React, { useEffect } from 'react';
import StreakCard from '../components/StreakCard';
import ProgressCard from '../components/ProgressCard';
import NewCourseCard from '../components/NewCourseCard';
import RecentActivityCard from '../components/RecentActivityCard';
import RecommendationCard from '../components/RecommendationCard';
import GreetingCard from '../components/GreetingCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourse } from '../features/courseSlice';
import LoadingPage from './LoadingPage';

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch()
  const { courses, status, error } = useSelector((state) => state.course);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Fetch data from the API
    // Update the state with the fetched data
    dispatch(getAllCourse())

  }, [dispatch]);

  if (status == 'loading' || status == 'idle') {
    return <LoadingPage content = 'Fetching Courses'/>
  }
  console.log(courses);
  

  return (
    <div>


      <GreetingCard />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Course Cards */}
          <ProgressCard />
          {
            courses.data.data.map((course) => {
              return <NewCourseCard key={course._id} course={course} />
            })
          }


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
