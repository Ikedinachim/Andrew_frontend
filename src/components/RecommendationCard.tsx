import React from "react";

const RecommendationCard: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-3 h-auto">
      <h3 className="text-lg font-semibold text-[#333333] mb-4">Recommendations</h3>
      <ul>
        <li className="flex items-center mb-4 pt-2">
          <img src="/assets/bell.svg" alt="notification" className="mr-3 w-[24px] h-auto"/>
          <div className="text-[#333333] text-sm font-medium">Complete module X for course XYZ</div>
        </li>
        <hr className="mx-[-21px] border-t-3 border-[#F3F5F9] mb-2" />
        <li className="flex items-center mb-4 pt-2">
          <img src="/assets/bell.svg" alt="notification" className="mr-3 w-[24px] h-auto"/>
          <div className="text-[#333333] text-sm font-medium">Study material BAG for better understanding</div>
        </li>
        <hr className="mx-[-21px] border-t-3 border-[#F3F5F9] mb-2" />
        <li className="flex items-center pt-2">
          <img src="/assets/bell.svg" alt="notification" className="mr-3 w-[24px] h-auto"/>
          <div className="text-[#333333] text-sm font-medium">Take 2 more quizzes to master Introduction to Python</div>
        </li>
      </ul>
    </div>
  );
};

export default RecommendationCard;
