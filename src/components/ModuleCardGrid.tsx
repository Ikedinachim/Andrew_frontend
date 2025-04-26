import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getModuleDetail } from '../features/moduleDetailSlice';
import { getSingleCourse } from '../features/courseDetailSlice';

const ModuleCardGrid = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleCardClick = () => {
        dispatch(getModuleDetail(props.id));
        dispatch(getSingleCourse(props.courseId));
        navigate(`/dashboard/module-details/${props.id}`);
    };      
    return (
        <div className="bg-white p-6 rounded-md shadow-md mb-6 w-full flex flex-col">

        <div className="flex items-center text-[12px] font-semibold mb-3">
            <span className="text-[#AAAAAA]">Module {props.order}</span>
            <span className="text-[#AAAAAA] mx-2">|</span>
            <div className="w-[5px] h-[5px] rounded-full bg-[#00ED6D] mr-2"></div>
            <span className="text-[#00ED6D]">On-Track</span>
        </div>

        <h2 className="text-lg font-semibold text-[#333333] mb-3 line-clamp-1">
            {props.title}
        </h2>

        <p className="text-[#AAAAAA] text-xs mb-4 line-clamp-3 min-h-[4em]">
            {props.desc}
        </p>

        <div className="flex items-center mb-3">
            <img src="/assets/Clock1.svg" alt="" className="mr-1 w-4 h-4" />
            <span className="text-[#FEC260] text-xs">
                <span className='mr-2'>Complete module within  {props.timeLeft ? props.timeLeft : ''} days to stay on track</span>
                <span className="mr-2">|</span>
                <span className="text-xs font-bold">Grade {props.grade ? props.grade + "%" : ''}</span>
            </span>
        </div>

        {/* <p className="font-semibold text-sm mb-2">Course Score -</p> */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-2 flex-wrap">
            <button
            className="bg-[#040BC5] text-white rounded-md px-5 py-2 w-full sm:w-auto hover:shadow-xl hover:bg-[#CDCEF3] hover:text-[#040BC5] cursor-pointer"
            onClick={() => handleCardClick()}
            >
            Continue
            </button>
            <button className="bg-white font-medium text-[#333333] border shadow-md border-[#AAAAAA] px-5 py-2 rounded-[8px] hover:shadow-lg hover:border-[#040BC5] cursor-pointer">
            Mark as Complete
            </button>
        </div>
        </div>

    );
};

export default ModuleCardGrid;