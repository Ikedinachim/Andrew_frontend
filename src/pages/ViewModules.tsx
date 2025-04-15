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

    return (
        <div>

            <h2 className="text-2xl font-semibold text-[#333333] mb-3">Modules</h2>
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


                {moduleData.data.data.map((module) => {
                    return <ModuleCardGrid key={module._id} title={module.title} desc={module.description} id={module._id} courseId={module.courseId} order ={module.order} />
                }
                )}


            </div> :
                <div className='w-full'>
                    {moduleData.data.data.map((module) => {
                        return <ModuleCard key={module._id} title={module.title} desc={module.description} id={module._id} courseId={module.courseId} order ={module.order} />
                    }
                    )}



                </div>
            }
        </div>
    );
};

export default ViewModules;