import React, { useState } from 'react';
import CourseCardGridNew from '../components/CourseCardGridNew';
import CourseCardGrid from '../components/CourseCardGrid';
import ProgressCard from '../components/ProgressCard';
import ModuleCardGrid from '../components/ModuleCardGrid';
import ModuleCard from '../components/ModuleCard';
import { useNavigate } from 'react-router-dom';

const ViewModules = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [view, setView] = useState<"list" | "grid">("grid");
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate('/dashboard/module-details-new-start');
    };      
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
                <ModuleCardGrid />
                <ModuleCardGrid />
                <ModuleCardGrid />
                <ModuleCardGrid />
                <ModuleCardGrid />
        
                <ModuleCardGrid />
        
               
            </div> :
                <div className='w-full'>
                    <ModuleCard />
                    <ModuleCard />
                    <ModuleCard />
                    <ModuleCard />
                    <ModuleCard />
                    <ModuleCard />
              

                </div>
            }
        </div>
    );
};

export default ViewModules;