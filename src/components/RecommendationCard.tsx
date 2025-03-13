import React from "react";

const RecommendationCard: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Recommendation</h3>
      <ul>
        <li className="mb-4 text-[#333333] font-semibold text-[16px] max-w-[277px]">Complete module X for course XYZ</li>
        <hr className='mx-[-24px] text-[#AAAAAA] h-[0.5px] mb-2' />
        <li className="mb-4 text-[#333333] font-semibold text-[16px] max-w-[277px]">Study material BAG for better understanding</li>
        <hr className='mx-[-24px] text-[#AAAAAA] h-[0.5px] mb-2' />
        <li className="mb-4 text-[#333333] font-semibold text-[16px] max-w-[277px]">Take 2 more quizzes to master Introduction to Python</li>
        <hr className='mx-[-24px] text-[#AAAAAA] h-[0.5px] mb-2' />
      </ul>
    </div>
  );
};

export default RecommendationCard;
