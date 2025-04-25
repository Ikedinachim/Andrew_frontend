import React from "react";

const ProgressCard: React.FC = () => {
  return (
    <div className="bg-white p-7 rounded-3xl shadow-lg mb-6 flex flex-row justify-between items-start flex-wrap">
      <div className="max-w-full md:max-w-[80%]">
        <div className="text-[12px] font-semibold mb-3">
          <div className="flex flex-row items-center">
            <div className="w-[5px] h-[5px] rounded-full bg-[#00ED6D] mr-2"></div>
            <span className="text-[#00ED6D] mr-4">On-Track</span>
            <span className="text-[#AAAAAA] mr-4">|</span>
            <span className="text-[#AAAAAA]">2nd February 2025</span>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-[#333333] leading-loose">
          Python for Data Science
        </h2>
        <p className="text-[#AAAAAA] py-2 text-sm">
          Learn how to analyze, visualize, and manipulate data using
          Python libraries like Pandas, NumPy, and Matplotlib, along with
          machine learning techniques.
        </p>

        <div className="flex items-center mb-5 mt-3 flex-wrap">
          <div className="w-full sm:w-1/3 bg-gray-200 rounded-full h-2.5 mr-2 mt-2 sm:mt-0">
            <div className="bg-[#040BC5] h-2.5 rounded-full w-[76px]"></div>
          </div>
          <span className="text-[#AAAAAA] text-sm mr-3 mt-2 sm:mt-0">3 of 8 modules</span>
          <span className="text-[#AAAAAA] text-sm mr-2">|</span>
          <img src="/assets/Clock.svg" alt="Clock Icon" className="mx-1 w-4 h-4" />
          <span className="text-[#AAAAAA] text-sm mr-3">4 weeks left</span>
          <span className="text-[#AAAAAA] text-sm mr-2">|</span>
          <span className="font-semibold text-sm">Course Grade--</span>
        </div>

        {/* <p className="font-semibold mb-2">Course Grade-</p> */}
        <div className="flex items-center mt-4 flex-wrap">
          <button className="bg-[#040bc5] border-2 border-[#040bc5] text-white text-base px-4 py-2 rounded-md mr-3 hover:shadow-lg hover:bg-[#585CD8] hover:border-[#585CD8] cursor-pointer">
            Resume Course
          </button>
          <span className="text-[#AAAAAA] text-sm ml-2">Next Module: Fundamental of Python</span>
        </div>
      </div>

      <img
        src="/assets/Programming 2.svg"
        alt="Course Image..."
        className="md:w-[12%] max-w-[12%] h-auto self-start hidden md:block"
      />
  </div>

  );
};

export default ProgressCard;
