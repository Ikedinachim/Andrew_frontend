import React from "react";
import { useSelector } from "react-redux";
import { Shimmer } from 'react-shimmer';

const RecommendationCard: React.FC = () => {
  const { recommendationData, recommendationStatus, recommendationError } = useSelector((state: any) => state.recommendation)
  if (recommendationStatus == 'loading' || recommendationStatus == 'idle') {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg mb-3 h-auto">
        <h3 className="text-lg font-semibold text-[#333333] mb-4">Recommendations</h3>
        <ul>
          <li className="flex items-center mb-4 pt-2">
            <img src="/assets/Bell.svg" alt="notification" className="mr-3 w-[24px] h-auto" />
            <Shimmer width={341} height={34} />
            {/* <div className="text-[#333333] text-sm font-medium">Complete module X for course XYZ</div> */}
          </li>
          <hr className="mx-[-21px] border-t-3 border-[#F3F5F9] mb-2" />
          <li className="flex items-center mb-4 pt-2">
            <img src="/assets/Bell.svg" alt="notification" className="mr-3 w-[24px] h-auto" />
            <Shimmer width={341} height={34} />
            {/* <div className="text-[#333333] text-sm font-medium">Study material BAG for better understanding</div> */}
          </li>
          <hr className="mx-[-21px] border-t-3 border-[#F3F5F9] mb-2" />
          <li className="flex items-center pt-2">
            <img src="/assets/Bell.svg" alt="notification" className="mr-3 w-[24px] h-auto" />
            <Shimmer width={341} height={34} />
            {/* <div className="text-[#333333] text-sm font-medium">Take 2 more quizzes to master Introduction to Python</div> */}
          </li>
        </ul>
      </div>
    );
  }
  console.log(recommendationData);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-3 h-auto">
      <h3 className="text-lg font-semibold text-[#333333] mb-4">Recommendations</h3>
      <ul>
        {recommendationData.data.map((item: any) => {
          return (
            <>
              <li className="flex items-center mb-4 pt-2">
                <img src="/assets/Bell.svg" alt="notification" className="mr-3 w-[24px] h-auto" />
                <div className="text-[#333333] text-sm font-medium">{item.message}</div>
              </li>
              <hr className="mx-[-21px] border-t-3 border-[#F3F5F9] mb-2 last:hidden" />
            </>
          )
        })}


      </ul>
    </div>
  );
};

export default RecommendationCard;
