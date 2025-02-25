import React from "react";

const NewCourseCard: React.FC = () => {

 



 

  return (
    <div className="bg-white p-6 rounded-md shadow-md mb-6 relative flex flex-row justify-between">
    <div className='max-w-[501px]'>
      <p className='text-[12px] font-semibold '>
        <div className='flex flex-row items-center'>

          <div className='w-[5px] h-[5px] rounded-[100%] bg-[#040BC5] mr-2'></div>
          <span className='text-[#040BC5] mr-2'>New</span>
          <span className='text-[12px] text-[#AAAAAA] mr-2'>  |  </span>
          <span className='text-[12px] text-[#AAAAAA]'>  2nd Febuary 2025</span>
        </div>
      </p>
      <h2 className="text-xl font-bold text-[#333333]">
        CyberSecurity & Ethical Hacking
      </h2>
      <p className="text-[#AAAAAA] mb-1">
        Gain expertise in securing networks, systems, and applications
        by understanding vulnerabilities, penetration testing, and
        ethical hacking techniques to protect against cyber threats
      </p>
      <div className="flex items-center mb-4">

        <span className="text-[#AAAAAA] text-sm">15 modules | </span>
        <img src="../../src/assets/Clock.svg" alt="" className='mx-1' />
        <span className="text-[#AAAAAA] text-sm">  4 weeks left</span>
      </div>

      <div className="flex justify-between items-center w-[60%]">
        <button className="bg-white font-medium text-[#333333] border shadow-md border-[#AAAAAA] px-3 py-2 rounded-[8px]">Learn more</button>
      </div>

    </div>
    <img src="../../src/assets/hacker.svg" alt="" />
  </div>
  );
};

export default NewCourseCard;
