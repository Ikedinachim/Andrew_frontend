import React from "react";

const SideBar: React.FC = (props) => {

  return (
    <div>
              <div className="flex flex-row max-w-[243px] max-h-[80px] items-center justify-between mb-[60px] mt-[19px]">
                <img src="../../src/assets/menu.svg" alt="" onClick={() => props.toggleDrawer()} />
                <div className="bg-[#D9D9D9] w-[178px] h-[60px]"></div>
              </div>
              <button className="mb-[32px] text-white bg-[#040BC5] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 py-3 px-6 rounded-[8px] font-medium text-[16px]">
                + Add New Course
              </button>
              <button className="mb-[8px] flex flex-row bg-[#CDCEF3] p-[12px] rounded-[8px] w-full font-semibold text-black">
                <img src="../../src/assets/Dashboard.svg" alt="" className="mr-[16px]" />
                <p>Dashboard</p>
              </button>
              <span className="flex flex-row items-center text-[#AAAAAA] text-[16px] pl-[16px]">
                <p>Learn</p>
                <hr className="w-full ml-2" />
              </span>
              <div className="flex flex-row text-[#333333] font-[400px] text-[16px] p-[12px]">
                <img src="../../src/assets/Vector.svg" alt="" className="mr-[16px]" />
                <p>Courses</p>
              </div>
              <div className="flex flex-row text-[#333333] font-[400px] text-[16px] p-[12px]">
                <img src="../../src/assets/Quiz.svg" alt="" className="mr-[16px]" />
                <p>Modules/Quizzes</p>
              </div>
              <div className="flex flex-row text-[#333333] font-[400px] text-[16px] p-[12px]">
                <img src="../../src/assets/Performance Reports.svg" alt="" className="mr-[16px]" />
                <p>Performance Reports</p>
              </div>
              <div className="flex flex-row text-[#333333] font-[400px] text-[16px] p-[12px]">
                <img src="../../src/assets/Recommendation.svg" alt="" className="mr-[16px]" />
                <p>Recommendations</p>
              </div>
            </div>
   
  );
};

export default SideBar;
