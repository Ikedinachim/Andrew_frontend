import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { getSingleCourse, resetCourseDetailStatus } from "../features/courseDetailSlice";
import { getModules } from "../features/moduleSlice";

const NewCourseCard: React.FC = ({ course }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _, status, error } = useSelector((state) => state.courseDetail);
  const date = new Date(course.createdAt);
  const optionDate = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-GB', optionDate);
  
  const handleLearnMore = () => {
    // Handle the "Learn More" button click
    dispatch(getSingleCourse(course._id))
    dispatch(getModules(course._id))
    
  };
  console.log(status);
  
  useEffect(() => {
    if (status == 'success') {
      navigate(`/dashboard/course-details/${course._id}`);
      dispatch(resetCourseDetailStatus());
    }
  }, [status, navigate])

  return (
    <div className="bg-white p-7 rounded-3xl shadow-lg mb-6 flex flex-row justify-between items-start flex-wrap">
      <div className="max-w-full md:max-w-[80%]">
        <div className="text-[12px] font-semibold mb-3">
          <div className="flex flex-row items-center">
            <div className="w-[5px] h-[5px] rounded-full bg-[#040BC5] mr-2"></div>
            <span className="text-[#040BC5] mr-4">New</span>
            <span className="text-[#AAAAAA] mr-4">|</span>
            <span className="text-[#AAAAAA]">{formattedDate}</span>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-[#333333] leading-loose">
          {course.title}
        </h2>
        <p className="text-[#AAAAAA] py-2 text-sm">
          {course.description}
        </p>
        <div className="flex items-center mb-5 mt-3">
          <span className="text-[#AAAAAA] text-sm mr-3 mt-2 sm:mt-0">{course.modules.length} modules</span>
          <span className="text-[#AAAAAA] text-sm mr-2">|</span>
          <img src="/assets/Clock.svg" alt="Clock Icon" className="mx-1 w-4 h-4" />
          <span className="text-[#AAAAAA] text-sm">{course.timeline} weeks left</span>
        </div>

        <div className="flex justify-between items-center ">
          <button onClick={handleLearnMore} className="bg-white font-medium text-[#333333] border shadow-md border-[#AAAAAA] px-5 py-2 rounded-[8px] hover:shadow-lg hover:border-[#040BC5] cursor-pointer my-2">Start Learning</button>
        </div>
      </div>
      <img
        src="/assets/hacker.svg"
        alt="Course Image..."
        className="md:w-[12%] max-w-[12%] h-auto self-start hidden md:block"
      />
    </div>
  );
};

export default NewCourseCard;

