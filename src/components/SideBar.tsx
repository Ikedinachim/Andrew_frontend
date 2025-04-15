import React from "react";
import { NavLink } from "react-router-dom";

const SideBar: React.FC = (props) => {

  return (
    <div>
      <div className="flex flex-row max-w-[243px] max-h-[80px] items-center justify-start mb-[60px] mt-[19px]">
        {/* <img src="/assets/bi_filter.svg" alt="" onClick={() => props.toggleDrawer()} /> */}
        <div><img src="/assets/logo.svg" alt="Andrew AI"/></div>
      </div>
      <NavLink to={'/dashboard/add-new-course'} className=" text-white bg-[#040BC5] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 py-3 px-8 rounded-[8px] font-semibold text-[16px]">
        + &nbsp; Add New Course
      </NavLink>
      <NavLink
        to='/dashboard'
        end
        className={({ isActive }) =>
          isActive
            ? "mb-[8px] mt-[32px] flex flex-row bg-[#cdcef3] p-[12px] rounded-[8px] w-full font-semibold text-black"
            : "mb-[8px] mt-[32px] flex flex-row  p-[12px] rounded-[8px] w-full font-semibold text-gray-600"
        }
      >
        <img src="/assets/Dashboard.svg" alt="" className="mr-[16px]" />
        <p>Dashboard</p>
      </NavLink>
      <span className="flex flex-row items-center text-[#AAAAAA] text-[16px] pl-[16px]">
        <p>Learn</p>
        <hr className="w-full ml-2" />
      </span>
      <NavLink to={'/dashboard/view-courses'} className={({ isActive }) =>
          isActive
            ? "  flex flex-row bg-[#cdcef3] p-[12px] rounded-[8px] w-full font-semibold text-black"
            : "  flex flex-row p-[12px] rounded-[8px] w-full font-normal text-gray-600"
        }>
        <img src="/assets/Vector.svg" alt="" className="mr-[16px]" />
        <p>Courses</p>
      </NavLink>
      <NavLink to={'/dashboard/view-modules'} className={({ isActive }) =>
          isActive
            ? " flex flex-row bg-[#cdcef3] p-[12px] rounded-[8px] w-full font-semibold text-black"
            : " flex flex-row p-[12px] rounded-[8px] w-full font-normal text-[#333333]"
        }>
        <img src="/assets/Quiz.svg" alt="" className="mr-[16px]" />
        <p>Modules/Quizzes</p>
      </NavLink>
      <NavLink to={'/dashboard/performance-report'} className={({ isActive }) =>
          isActive
            ? " flex flex-row bg-[#cdcef3] p-[12px] rounded-[8px] w-full font-semibold text-black"
            : " flex flex-row p-[12px] rounded-[8px] w-full font-normal text-gray-600"
        }>
        <img src="/assets/Performance Reports.svg" alt="" className="mr-[16px]" /> 
        <p>Performance Reports</p>
      </NavLink>
      {/* <NavLink to={'/dashboard/recommendations'} className={({ isActive }) =>
          isActive
            ? " flex flex-row bg-[#cdcef3] p-[12px] rounded-[8px] w-full font-semibold text-black"
            : " flex flex-row p-[12px] rounded-[8px] w-full font-semibold text-gray-600"
        }>
        <img src="/assets/Recommendation.svg" alt="" className="mr-[16px]" />
        <p>Recommendations</p>
      </NavLink> */}
    </div>

  );
};

export default SideBar;
