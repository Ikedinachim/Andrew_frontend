import React from 'react';
import { useNavigate } from 'react-router-dom';

const ModuleCard = () => {
  const navigate = useNavigate();
  const handleCardClick = () => {
      navigate('/dashboard/module-details');
  };      
    return (
        <div className="bg-white p-6 rounded-md shadow-md mb-6 relative flex flex-col">
      <div className=''>
        <p className='text-[12px] font-semibold '>
          <div className='flex flex-row items-center'>

            <span className='text-[12px] text-[#AAAAAA]'>Module 1</span>
            <span className='text-[12px] text-[#AAAAAA] mx-2'>  |  </span>
            <div className='w-[5px] h-[5px] rounded-[100%] bg-[#00ED6D] mr-2'></div>
            <span className='text-[#00ED6D] mr-2'>Completed</span>
          </div>
        </p>
        <h2 className="text-xl font-bold text-[#333333]">
          Introduction to Python for Data Science
        </h2>
        <p className="text-[#AAAAAA]">
        Sets the foundation by introducing Python as a powerful 
        tool for data analysis. It covers the basics of Python, 
        including variables, loops, functions, and data types, 
        while guiding learners through setting up their Python 
        environment using Jupyter Notebook, Anaconda, or VS Code. 
        </p>
        <div className="flex items-center mb-2">
                
                <img src="../../src/assets/Clock1.svg" alt="" className='mr-1 ' />
                <span className="text-[#FEC260] text-sm">  Complete module by 02/05 to stay on track</span>
            </div>
        <p className='font-semibold mb-2 '>Course Score- </p>
        <div className="flex  items-center ">
          <button className="bg-[#040BC5] text-white px-4 py-2 rounded-md mr-2" onClick={() => handleCardClick()}>Continue Module</button>
          <button className="bg-white shadow-md text-[#040bc5] text-[16px] border-2 border-[#040bc5] rounded-[8px] mr-2 py-2 px-3 ">Mark as Complete</button>
        
        </div>

      </div>
      
    </div>
    );
};

export default ModuleCard;