import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import Topbar from '../components/TopBar';
import CourseCardGrid from '../components/CourseCardGrid';
import CourseCardGridNew from '../components/CourseCardGridNew';
import ProgressCard from '../components/ProgressCard';
import NewCourseCard from '../components/NewCourseCard';
import { getAllCourse } from '../features/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingPage from './LoadingPage';


const ViewCoursePage: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [view, setView] = useState<"list" | "grid">("grid");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { courses, status, error } = useSelector((state) => state.course);
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

      useEffect( () => {
        // Fetch data from the API
        // Update the state with the fetched data
        dispatch(getAllCourse())
        
      }, [dispatch]);
    
      if (status == 'loading' || status == 'idle') {
        return <LoadingPage content = 'Fetching Courses'/>
      }
      

    return (
        <div>
            <h2 className="text-3xl font-semibold text-[#333333] mt-4 ml-4 mb-3">
            All Courses
            </h2>

            <div className="flex justify-between items-center px-4">
            <p className="text-sm text-[#AAAAAA]">
                Improve skills through the courses and assessments of courses
            </p>
            
            <div className="flex rounded-lg bg-gray-200 p-1 lg:mr-4">
                <button
                onClick={() => setView("list")}
                className={`flex items-center justify-center p-2 rounded-md transition-colors duration-300 ${view === "list" ? "bg-[#ABAEEC]" : "bg-white"}`}
                >
                <img src="/assets/List.svg" alt="List View" className="w-5 h-5" />
                </button>
                <button
                onClick={() => setView("grid")}
                className={`flex items-center justify-center p-2 rounded-md transition-colors duration-300 ${view === "grid" ? "bg-[#ABAEEC]" : "bg-white"}`}
                >
                <img src="/assets/Grid.svg" alt="Grid View" className="w-5 h-5" />
                </button>
            </div>
            </div>

            {view == "grid" ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 p-4 max-w-7xl mx-auto mt-4">
                <CourseCardGridNew />

                {courses.data.data.map((course) => {
                    return (
                    <CourseCardGrid
                        key={course._id}
                        img='/assets/hacker.svg'
                        title={course.title}
                        content={course.description}
                        modules={8}
                        weeks={4}
                        _id={course._id}
                    />
                    );
                })}
                </div> :
                <div className='w-full'>
                    <ProgressCard />
                    {
             courses.data.data.map((course) => {
             return <NewCourseCard key={course._id} course={course} />
              })
          }

                </div>
            }
        </div>
    );
};

export default ViewCoursePage;
