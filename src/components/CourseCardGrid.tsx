import React, { useEffect } from 'react';
import { getSingleCourse, resetCourseDetailStatus } from '../features/courseDetailSlice';
import { getModules } from '../features/moduleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CourseCardGrid = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { _, status, error } = useSelector((state) => state.courseDetail);


     const handleLearnMore = () => {
        // Handle the "Learn More" button click
        dispatch(getSingleCourse(props._id))
        dispatch(getModules(props._id))
        
      };
     useEffect(() => {
        if (status == 'success') {
          navigate(`/dashboard/course-details/${props._id}`);
          dispatch(resetCourseDetailStatus());
        }
      }, [status, navigate])
    return (
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md mb-6 w-full flex flex-col">
            <img 
                src={props.img} 
                alt="" 
                className="w-16 h-16 object-contain mb-4"
            />
            
            <div className="flex items-center text-[12px] font-semibold mb-3">
                <div className="w-[5px] h-[5px] rounded-full bg-[#040BC5] mr-2"></div>
                <span className="text-[#040BC5] mr-2">New</span>
                <span className="text-[#AAAAAA] mr-2">|</span>
                <span className="text-[#AAAAAA]">2nd February 2025</span>
            </div>

            <h2 className="text-lg font-semibold text-[#333333] mb-3">
                {props.title}
            </h2>

            <p className="text-[#AAAAAA] text-xs mb-4 line-clamp-3 min-h-[4em]">
                {props.content}
            </p>

            <div className="flex items-center mb-3 flex-wrap">
                <span className="text-[#AAAAAA] text-xs mr-2">{props.modules} modules</span>
                <span className="text-[#AAAAAA] text-xs">|</span>
                <img src="/assets/Clock.svg" alt="" className="mx-1 w-4 h-4" />
                <span className="text-[#AAAAAA] text-xs">{props.weeks} weeks left</span>
            </div>

            <div className="flex justify-between items-center w-full md:w-[60%] mt-2">
                <button
                className="bg-white font-medium text-[#333333] border shadow-md border-[#AAAAAA] px-5 py-2 rounded-[8px] hover:shadow-lg hover:border-[#040BC5] cursor-pointer w-full"
                onClick={() => handleLearnMore()}
                >
                Start Learning
                </button>
            </div>
            </div>

    );
};

export default CourseCardGrid;