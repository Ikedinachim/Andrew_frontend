import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSingleCourse, resetCourseDetailStatus } from "../features/courseDetailSlice";
import { getModules } from "../features/moduleSlice";

const ProgressCard: React.FC = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _, status, error } = useSelector((state) => state.courseDetail);
  // useEffect(() => {
  //   if (status == 'success') {
  //     dispatch(resetCourseDetailStatus());
  //     navigate(`/dashboard/course-details/${props._id}`);
  //   }
  // }, [status, navigate])
  
  
  const date = new Date(props.createdAt);
  const optionDate = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-GB', optionDate);
  
  const handleResumeCourse= () => {
    // Handle the "Learn More" button click
    dispatch(getSingleCourse(props._id))
    dispatch(getModules(props._id))
    navigate(`/dashboard/course-details/${props._id}`);
    
    
  };
  let progress = 0
    if (props.totalModules != 0){
        progress = props.completedModules / props.totalModules;
    }
  return (
    <div className="bg-white p-7 rounded-3xl shadow-lg mb-6 flex flex-row justify-between items-start flex-wrap">
      <div className="max-w-full md:max-w-[80%]">
        <div className="text-[12px] font-semibold mb-3">
          <div className="flex flex-row items-center">
            <div className="w-[5px] h-[5px] rounded-full bg-[#00ED6D] mr-2"></div>
            <span className="text-[#00ED6D] mr-4">On-Track</span>
            <span className="text-[#AAAAAA] mr-4">|</span>
            <span className="text-[#AAAAAA]">{formattedDate}</span>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-[#333333] leading-loose">
          {props.title}
        </h2>
        <p className="text-[#AAAAAA] py-2 text-sm">
          {props.description}
        </p>

        <div className="flex items-center mb-5 mt-3 flex-wrap">
          <div className="w-full sm:w-1/3 bg-gray-200 rounded-full h-2.5 mr-2 mt-2 sm:mt-0">
            <div style={{ width: `${progress}%` }} className="bg-[#040BC5] h-2.5 rounded-full w-[76px]"></div>
          </div>
          <span className="text-[#AAAAAA] text-sm mr-3 mt-2 sm:mt-0">{props.completedModules} of {props.totalModules} modules</span>
          <span className="text-[#AAAAAA] text-sm mr-2">|</span>
          <img src="/assets/Clock.svg" alt="Clock Icon" className="mx-1 w-4 h-4" />
          <span className="text-[#AAAAAA] text-sm mr-3">{props.daysLeft || 3} weeks left</span>
          <span className="text-[#AAAAAA] text-sm mr-2">|</span>
          <span className="font-semibold text-sm">Course Grade-- {props.grade}</span>
        </div>

        {/* <p className="font-semibold mb-2">Course Grade-</p> */}
        <div className="flex items-center mt-4 flex-wrap">
          <button onClick={() => handleResumeCourse()} className="bg-[#040bc5] border-2 border-[#040bc5] text-white text-base px-4 py-2 rounded-md mr-3 hover:shadow-lg hover:bg-[#585CD8] hover:border-[#585CD8] cursor-pointer">
            Resume Course
          </button>
          <span className="text-[#AAAAAA] text-sm ml-2">Next Module: {props.nextModule}</span>
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
