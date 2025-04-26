import React, { useEffect, useState } from 'react';
import CourseCardGridNew from '../components/CourseCardGridNew';
import CourseCardGrid from '../components/CourseCardGrid';
import ProgressCard from '../components/ProgressCard';
import ModuleCardGrid from '../components/ModuleCardGrid';
import ModuleCard from '../components/ModuleCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllModules } from '../features/moduleSlice';
import LoadingPage from './LoadingPage';

const ViewModules = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [view, setView] = useState<"list" | "grid">("grid");
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { moduleData, moduleStatus, moduleError } = useSelector((state) => state.module)
    const handleCardClick = () => {
        navigate('/dashboard/module-details-new-start');
    };
    useEffect(() => {
        // Fetch data from the API
        // Update the state with the fetched data
        dispatch(getAllModules())

    }, [dispatch]);

    if (moduleStatus == 'loading' || moduleStatus == 'idle') {
        return <LoadingPage content='Fetching Modules' />
    }
    console.log(moduleData.data.data);
    if (moduleData.data.data.length == 0) {
        return(
        <div className='flex flex-col items-center justify-center'>
        <img src="/assets/no_course.svg" alt="" />
        <h1 className='font-semibold text-[28px] text-[#333333] max-w-[499px] mt-4 mb-8 text-center'>No module contents to show yet!! 
          Please add new courses to generate modules</h1>
          <button onClick={ () => navigate('/dashboard/add-new-course')} className=" text-white bg-[#040BC5] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 py-3 px-8 rounded-[8px] font-semibold text-[16px]">
            + &nbsp; Add New Course
          </button>
    
        </div>)
      }
    return (
        <div>
            <h2 className="text-3xl font-semibold text-[#333333] mt-4 ml-4 mb-3">
            All Modules
            </h2>
            <div className="flex justify-between items-center px-4">
            <p className="text-sm text-[#AAAAAA]">
                Improve skills through the courses and assessments of courses
            </p>
                <div className="flex rounded-lg bg-gray-200 p-1">
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

            {view == "grid" ? <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 p-4 max-w-7xl mx-auto mt-4'>


                {moduleData.data.data.map((module) => {
                    return <ModuleCardGrid key={module._id} title={module.title} desc={module.description} id={module._id} courseId={module.courseId} order ={module.order} timeLeft={module.timeLeft}/>
                }
                )}


            </div> :
                <div className='w-full'>
                    {moduleData.data.data.map((module) => {
                        return <ModuleCard key={module._id} title={module.title} desc={module.description} id={module._id} courseId={module.courseId} order ={module.order} timeLeft={module.timeLeft} />
                    }
                    )}



                </div>
            }
        </div>
    );
};

export default ViewModules;