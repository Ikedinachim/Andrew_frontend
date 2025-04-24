import React from "react";
import { useSelector } from "react-redux";
import { Shimmer } from 'react-shimmer';
const RecentActivityCard: React.FC = () => {

  const { recentActivityData, recentActivityStatus, recentActivityError } = useSelector((state: any) => state.recentActivity)

  
  if (recentActivityStatus == 'loading' || recentActivityStatus == 'idle') {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg mb-3 h-auto">
        <h3 className="text-lg font-semibold text-[#333333] mb-4">Recent Activities</h3>
        <ul>
          <li className="flex items-center mb-4 pt-2">
            {/* <div className="bg-[#D9D9D9] w-[24px] h-[24px] mr-2"></div> */}
            <img src="/assets/activity.svg" alt="notification" className="mr-3 w-[24px] h-auto" />
            <div className='flex flex-col '>
              <Shimmer width={301} height={34} />
              <span className="text-[#AAAAAA] text-sm flex flex-row items-center">

                <Shimmer width={100} height={34} />
              </span>
            </div>

          </li>
          <hr className="mx-[-21px] border-t-3 border-[#F3F5F9] mb-2" />
          <li className="flex items-center mb-4 pt-2">
            {/* <div className="bg-[#D9D9D9] w-[24px] h-[24px] mr-2"></div> */}
            <img src="/assets/activity.svg" alt="notification" className="mr-3 w-[24px] h-auto" />
            <div className='flex flex-col '>
            <Shimmer width={301} height={34} />
            <span className="text-[#AAAAAA] text-sm flex flex-row items-center">
             
              <Shimmer width={100} height={34} />
            </span>
          </div>

          </li>
          <hr className="mx-[-21px] border-t-3 border-[#F3F5F9] mb-2" />
          <li className="flex items-center mb-4 pt-2">
            {/* <div className="bg-[#D9D9D9] w-[24px] h-[24px] mr-2"></div> */}
            <img src="/assets/activity.svg" alt="notification" className="mr-3 w-[24px] h-auto" />
            <div className='flex flex-col '>
            <Shimmer width={301} height={34} />
            <span className="text-[#AAAAAA] text-sm flex flex-row items-center">
             
              <Shimmer width={100} height={34} />
            </span>
          </div>
          </li>
          <hr className="mx-[-21px] border-t-3 border-[#F3F5F9] mb-2" />

          <li className="flex items-center pt-2">
            {/* <div className="bg-[#D9D9D9] w-[24px] h-[24px] mr-2"></div> */}
            <img src="/assets/activity.svg" alt="notification" className="mr-3 w-[24px] h-auto" />
            <div className='flex flex-col '>
            <Shimmer width={301} height={34} />
            <span className="text-[#AAAAAA] text-sm flex flex-row items-center">
             
              <Shimmer width={100} height={34} />
            </span>
          </div>

          </li>
          {/* <hr className='mx-[-24px] text-[#AAAAAA] h-[0.5px] mb-2' /> */}

        </ul>
      </div>
    );
  }
  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    } else {
      return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-3 h-auto">
      <h3 className="text-lg font-semibold text-[#333333] mb-4">Recent Activities</h3>
      <ul>
        
      {recentActivityData.data.map((item: any) => {
       return  (<>
        <li className="flex items-center mb-4 pt-2">
        {/* <div className="bg-[#D9D9D9] w-[24px] h-[24px] mr-2"></div> */}
        <img src="/assets/activity.svg" alt="notification" className="mr-3 w-[24px] h-auto" />
        <div className='flex flex-col '>
          <span className="text-[#333333] text-sm font-medium">{item.message}</span>
          <span className="text-gray-400 text-sm flex flex-row items-center">
            <div className='w-[5px] h-[5px] rounded-[100%] bg-[#040BC5] mr-2'></div>
            <p className='text-[12px] text-[#AAAAAA] font-light'>{getTimeAgo(item.createdAt)}</p>

          </span>
        </div>

      </li>
      <hr className="mx-[-21px] border-t-3 border-[#F3F5F9] mb-2 last:hidden" />
        </>)
      })}
       
      </ul>
    </div>
  );
};

export default RecentActivityCard;
