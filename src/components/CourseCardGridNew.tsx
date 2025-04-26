import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSingleCourse, resetCourseDetailStatus } from '../features/courseDetailSlice';
import { getModules } from '../features/moduleSlice';


const CourseCardGridNew = (props) => {
    const date = new Date(props.createdAt);
    const optionDate = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', optionDate);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { _, status, error } = useSelector((state) => state.courseDetail);
    let progress = 0
    if (props.modules != 0){
        progress = props.completedModules / props.modules;
    }

      const handleResumeCourse= () => {
         // Handle the "Learn More" button click
         dispatch(getSingleCourse(props._id))
         dispatch(getModules(props._id))
         navigate(`/dashboard/course-details/${props._id}`);
         
         
       };
    return (
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md mb-6 w-full flex flex-col">
            <img
                src="/assets/Programming 2.svg"
                alt=""
                className="w-16 h-16 object-contain mb-4"
            />

            <div className="flex items-center text-[12px] font-semibold mb-3">
                <div className="w-[5px] h-[5px] rounded-full bg-[#00ED6D] mr-2"></div>
                <span className="text-[#00ED6D] mr-2">On-Track</span>
                <span className="text-[#AAAAAA] mr-2">|</span>
                <span className="text-[#AAAAAA]">{formattedDate}</span>
            </div>

            <h2 className="text-lg font-semibold text-[#333333] mb-3">
                {props.title}
            </h2>

            <p className="text-[#AAAAAA] text-xs mb-4 line-clamp-3 min-h-[4em]">
                {props.description}
            </p>

            <div className="flex items-center mb-3 flex-wrap">
                <div className="w-1/5 bg-gray-200 rounded-full h-[5px] mr-2">
                    <div style={{ width: `${progress}%` }} className="bg-[#040BC5] h-[5px] rounded-full w-[24px]"></div>
                </div>
                <span className="text-[#AAAAAA] text-xs mr-1">{props.completedModules} of {props.modules} modules</span>
                <span className="text-[#AAAAAA] text-xs">|</span>
                <img src="/assets/Clock.svg" alt="" className="mx-1 w-4 h-4" />
                <span className="text-[#AAAAAA] text-xs mr-1">{props.daysleft || 3} weeks left</span>
                <span className="text-[#AAAAAA] text-xs mr-1">|</span>
                <span className="text-[#AAAAAA] text-xs font-bold">{props.grade}</span>
            </div>

            {/* <p className="font-semibold text-sm mb-2">Course Grade -</p> */}

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                <button onClick={handleResumeCourse} className="bg-[#040BC5] text-white rounded-md px-5 py-2 w-full sm:w-auto hover:shadow-xl hover:bg-[#CDCEF3] hover:text-[#040BC5] cursor-pointer">
                Resume
                </button>
                <p className="text-[#AAAAAA] text-[12px] font-semibold text-wrap">
                Next Module: {props.nextModule}
                </p>
            </div>
            </div>

    );
};

export default CourseCardGridNew;