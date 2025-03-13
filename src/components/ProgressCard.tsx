import React from "react";

const ProgressCard: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-6 relative flex flex-row justify-between">
      <div className='max-w-[501px]'>
        <p className='text-[12px] font-semibold '>
          <div className='flex flex-row items-center'>

            <div className='w-[5px] h-[5px] rounded-[100%] bg-[#00ED6D] mr-2'></div>
            <span className='text-[#00ED6D] mr-2'>On-Track</span>
            <span className='text-[12px] text-[#AAAAAA] mr-2'>  |  </span>
            <span className='text-[12px] text-[#AAAAAA]'>  2nd Febuary 2025</span>
          </div>
        </p>
        <h2 className="text-xl font-bold text-[#333333]">
          Python for Data Science
        </h2>
        <p className="text-[#AAAAAA]">
          Learn how to analyze, visualize, and manipulate data using
          Python libraries like Pandas, NumPy, and Matplotlib, along with
          machine learning techniques.
        </p>
        <div className="flex items-center mb-4">
          <div className="w-1/3 bg-gray-200 rounded-full h-2.5 mr-2 ">
            <div className="bg-[#040BC5] h-2.5 rounded-full w-[76px]"></div>
          </div>
          <span className="text-[#AAAAAA] text-sm">3 of 8 modules | </span>
          <img src="../../src/assets/Clock.svg" alt="" className='mx-1' />
          <span className="text-[#AAAAAA] text-sm">  4 weeks left</span>
        </div>
        <p className='font-semibold mb-2 '>Course Grade- </p>
        <div className="flex  items-center ">
          <button className="bg-[#040BC5] text-white px-4 py-2 rounded-md mr-2">Resume Course</button>
          <span className="text-[#AAAAAA] text-sm">Next Module: Fundamental of Python</span>
        </div>

      </div>
      <img src="../../src/assets/Programming 2.svg" alt="" />
    </div>
  );
};

export default ProgressCard;
