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
        
      }, []);
    
      if (status == 'loading' || status == 'idle') {
        return <LoadingPage content = 'Fetching Courses'/>
      }
      if (courses.data.data.length == 0) {
        return(
        <div className='flex flex-col items-center justify-center'>
        <img src="../../public/assets/no_course.svg" alt="" />
        <h1 className='font-semibold text-[28px] text-[#333333] max-w-[499px] mt-4 mb-8 text-center'>No course contents to show yet!! 
          Please add new courses to get started</h1>
          <button onClick={ () => navigate('/dashboard/add-new-course')} className=" text-white bg-[#040BC5] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 py-3 px-8 rounded-[8px] font-semibold text-[16px]">
            + &nbsp; Add New Course
          </button>
    
        </div>)
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

                {courses.data.data.map((course) => {
                    if (course.modules.length != 0){
                        return  <CourseCardGridNew 
                        key={course._id}
                        _id = {course._id}
                        title = {course.title}
                        description = {course.description}
                        modules = {course.learningSummary.totalModules}
                        completedModules = {course.learningSummary.completedModules}
                        daysLeft = {course.learningSummary.daysLeft}
                        grade = {course.learningSummary.courseGrade}
                        nextModule = {course.learningSummary.nextIncompleteModule}
                        createdAt = {course.createdAt}
                        />
                    }else{
                        return (
                        <NewCourseCard
                            key={course._id}
                            img='/assets/hacker.svg'
                            title={course.title}
                            content={course.description}
                            modules={8}
                            course = {course}
                            createdAt = {course.createdAt}
                            weeks={4}
                            _id={course._id}
                        />
                    );

                    }
                })}
                </div> :
                <div className='w-full'>
                   
                    {
             courses.data.data.map((course) => {
                if (course.modules.length != 0){
                    return  <ProgressCard 
                    key={course._id}
                    _id = {course._id}
                    title = {course.title}
                    description = {course.description}
                    modules = {course.learningSummary.totalModules}
                    completedModules = {course.learningSummary.completedModules}
                    daysLeft = {course.learningSummary.daysLeft}
                    grade = {course.learningSummary.courseGrade}
                    nextModule = {course.learningSummary.nextIncompleteModule}
                    createdAt = {course.createdAt}
                    />
                }else{
                    return (
                    <NewCourseCard
                        key={course._id}
                        course = {course}
                    />
                );

                }
              })
          }

                </div>
            }
        </div>
    );
};

export default ViewCoursePage;
