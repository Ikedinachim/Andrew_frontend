import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import Topbar from '../components/TopBar';
import CourseCardGrid from '../components/CourseCardGrid';
import CourseCardGridNew from '../components/CourseCardGridNew';
import ProgressCard from '../components/ProgressCard';
import NewCourseCard from '../components/NewCourseCard';


const ViewCoursePage: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [view, setView] = useState<"list" | "grid">("grid");

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

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
                <CourseCardGrid img='../../src/assets/hacker.svg'
                    title='CyberSecurity & Ethical Hacking'
                    content='Gain expertise in securing networks, systems, and applications by understand....'
                    modules={8}
                    weeks={4}
                />

                <CourseCardGrid img='../../src/assets/ux.svg'
                    title='UX Design & Usability Principles'
                    content='Learn the fundamentals of user experience (UX) design, including research, wirefra...'
                    modules={10}
                    weeks={6}
                />
                <CourseCardGrid img='../../src/assets/ux.svg'
                    title='UX Design & Usability Principles'
                    content='Learn the fundamentals of user experience (UX) design, including research, wirefra...'
                    modules={10}
                    weeks={6}
                />
                <CourseCardGrid img='../../src/assets/ux.svg'
                    title='UX Design & Usability Principles'
                    content='Learn the fundamentals of user experience (UX) design, including research, wirefra...'
                    modules={10}
                    weeks={6}
                />
                <CourseCardGrid img='../../src/assets/hacker.svg'
                    title='CyberSecurity & Ethical Hacking'
                    content='Gain expertise in securing networks, systems, and applications by understand....'
                    modules={8}
                    weeks={4}
                />
            </div> :
                <div className='w-full'>
                    <ProgressCard />
                    <NewCourseCard />
                    <NewCourseCard />
                    <NewCourseCard />
                    <NewCourseCard />

                </div>
            }
        </div>
    );
};

export default ViewCoursePage;
