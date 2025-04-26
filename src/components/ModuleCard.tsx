import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getModuleDetail } from '../features/moduleDetailSlice';
import { getSingleCourse } from '../features/courseDetailSlice';

const ModuleCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCardClick = () => {
      dispatch(getModuleDetail(props.id))
      dispatch(getSingleCourse(props.courseId))
      navigate(`/dashboard/module-details/${props.id}`);
  };      
    return (
        <div className="bg-white p-7 rounded-3xl shadow-lg mb-6 flex flex-row justify-between items-start flex-wrap mt-6 max-w-full md:max-w-[80%]">
          <div className=''>
            <p className='text-[12px] font-semibold mb-3'>
              <div className='flex flex-row items-center'>
                <span className='text-[#AAAAAA]'>Module 1</span>
                <span className='text-[#AAAAAA] mx-2'>  |  </span>
                <div className='w-[5px] h-[5px] rounded-full bg-[#00ED6D] mr-2'></div>
                <span className='text-[#00ED6D] mr-2'>Completed</span>
              </div>
            </p>
            <h2 className="text-xl font-semibold text-[#333333] leading-loose">
              {props.title}
            </h2>
            <p className="text-[#AAAAAA] py-2 text-sm">
              {props.desc}
            </p>
            <div className="flex items-center mb-3 mt-2">
              <img src="/assets/Clock1.svg" alt="" className="mr-1 w-4 h-4" />
              <span className="text-[#FEC260] text-xs">
                  <span className='mr-2'>Complete module within {props.timeLeft ? props.timeLeft + "%" : ''} day/s to stay on track</span>
                  <span className="mr-2">|</span>
                  <span className="text-xs font-bold">Grade {props.grade ? props.grade + "%" : ''}</span>
              </span>
            </div>
            {/* <p className='font-semibold mb-2 '>Course Score- </p> */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-4 flex-wrap">
              <button className="bg-[#040BC5] text-white rounded-md px-5 py-2 w-full sm:w-auto hover:shadow-xl hover:bg-[#CDCEF3] hover:text-[#040BC5] cursor-pointer" onClick={() => handleCardClick()}>Continue Module</button>
              <button className="bg-white font-medium text-[#333333] border shadow-md border-[#AAAAAA] px-5 py-2 rounded-[8px] hover:shadow-lg hover:border-[#040BC5] cursor-pointer">Mark as Complete</button>
            
            </div>

          </div>
      
    </div>
    );
};

export default ModuleCard;