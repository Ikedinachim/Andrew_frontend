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
        <div className="bg-white p-6 rounded-md shadow-md mb-6   w-[364px]    flex flex-col ">
            {/* <div className=''> */}
            <p className='text-[12px] font-semibold '>
                <div className='flex flex-row items-center'>

                    <span className='text-[12px] text-[#AAAAAA]'> Module {props.order} </span>
                    <span className='text-[12px] text-[#AAAAAA] mx-2'>  |  </span>
                    <div className='w-[5px] h-[5px] rounded-[100%] bg-[#00ED6D] mr-2'></div>
                    <span className='text-[#00ED6D] mr-2'>On-Track</span>
                </div>
            </p>
            <h2 className="text-xl font-semibold text-[#333333]">
                {props.title}
            </h2>
            <p className="text-[#AAAAAA]">
                {props.desc}
            </p>
            <div className="flex items-center mb-2">
                
                <img src="../../src/assets/Clock1.svg" alt="" className='mr-1 ' />
                <span className="text-[#FEC260] text-sm">  Complete module by 02/05 to stay on track</span>
            </div>
            <p className='font-semibold mb-2 '>Course Score- </p>
            <div className="flex   flex-row  items-center  ">
                <button className="bg-[#040BC5]  text-white text-[16px] rounded-[8px] mr-2 py-2 px-3 " onClick={() => handleCardClick()}>Continue</button>
                <button className="bg-white shadow-md text-[#040bc5] text-[16px] border-2 border-[#040bc5] rounded-[8px] mr-2 py-2 px-3 ">Mark as Complete</button>
            </div>

            {/* </div> */}
        </div>
    );
};

export default ModuleCardGrid;