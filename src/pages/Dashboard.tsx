import React, { useEffect, useState } from 'react';
import StreakCard from '../components/StreakCard';
import ProgressCard from '../components/ProgressCard';
import NewCourseCard from '../components/NewCourseCard';
import RecentActivityCard from '../components/RecentActivityCard';
import RecommendationCard from '../components/RecommendationCard';
import GreetingCard from '../components/GreetingCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourse } from '../features/courseSlice';
import LoadingPage from './LoadingPage';
import { getUserProfile } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import { getRecentActivity } from '../features/recentActivitySlice';
import { getRecommendation } from '../features/recommendationSlice';


const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showNotification, setShowNotification] = useState(window.localStorage.getItem('showNotification'));
  const { courses, status, error } = useSelector((state) => state.course);
  const { user, userStatus, userError } = useSelector((state: any) => state.user)
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Fetch data from the API
    // Update the state with the fetched data
    dispatch(getUserProfile())
    dispatch(getAllCourse())
    dispatch(getRecentActivity())
    dispatch(getRecommendation())

  }, [dispatch]);

  if (status == 'loading' || status == 'idle' || userStatus == 'idle' || userStatus == 'loading') {
    return <LoadingPage content='Fetching Courses' />
  }
  console.log(courses);

  if (courses.data.data.length == 0) {
    return (
      <div className='flex flex-col items-center justify-center'>
        <img src="../../public/assets/no_course.svg" alt="" />
        <h1 className='font-semibold text-[28px] text-[#333333] max-w-[499px] mt-4 mb-8 text-center'>No course contents to show yet!!
          Please add new courses to get started</h1>
        <button onClick={() => navigate('/dashboard/add-new-course')} className=" text-white bg-[#040BC5] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 py-3 px-8 rounded-[8px] font-semibold text-[16px]">
          + &nbsp; Add New Course
        </button>

      </div>)
  }
  const closeHandler = () => {
    setShowNotification('FALSE')
    window.localStorage.setItem('showNotification', 'FALSE')

  }
  return (

    <div>


      {showNotification === 'TRUE' && <GreetingCard close={closeHandler} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Course Cards */}
          {
            courses.data.data.map((course) => {
              console.log(course);

              if (course.learningSummary.totalModules) {
                return < ProgressCard key={course._id} _id={course._id}
                  title={course.title} totalModules={course.learningSummary.totalModules}
                  completedModules={course.learningSummary.completedModules}
                  description={course.description}
                  daysLeft={Math.floor(course.daysLeft / 7)}
                  createdAt={course.createdAt}
                  grade={course.learningSummary.courseGrade}
                  nextModule={course.learningSummary.firstIncompleteModule
                  }
                />
              } else {
                return <NewCourseCard key={course._id} course={course} />

              }
            })
          }


        </div>
        {/* Sidebar Right */}
        <div>
          <RecommendationCard />

          <StreakCard />

          <RecentActivityCard />

        </div>
      </div>
    </div>

  );
};

export default Dashboard;
