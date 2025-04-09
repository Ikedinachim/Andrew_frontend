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

            <h2 className="text-2xl font-semibold text-[#333333] mb-3">Courses</h2>
            <div className='flex flex-row justify-between items-center'>
                <p className='text-xl text-[#aaaaaa]'>Improve skills though the courses and assessments of courses</p>
                <div className="flex rounded-lg bg-gray-200 w-[96px] p-1">
                    <button
                        onClick={() => setView("list")}
                        className={`flex items-center justify-center px-3 py-2 rounded-tl-md rounded-bl-md shadow-md transition-colors ${view === "list" ? "bg-[#ABAEEC]" : "bg-white"
                            }`}
                    >
                        <img src="../../src/assets/List.svg" alt="" />
                    </button>
                    <button
                        onClick={() => setView("grid")}
                        className={`flex items-center justify-center px-3 py-2 rounded-md transition-colors ${view === "grid" ? "bg-[#ABAEEC]" : "bg-white"
                            }`}
                    >
                        <img src="../../src/assets/Grid.svg" alt="" />

                    </button>
                </div>
            </div>

            {view == "grid" ? <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8  p-4 '>
                <CourseCardGridNew />
                {
             courses.data.data.map((course) => {
             return <CourseCardGrid img='../../src/assets/hacker.svg'
             title={course.title}
             content={course.description}
             modules={8}
             weeks={4}
             _id = {course._id}
         />
              })
          }
               
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
