import React from "react";

const RecentActivityCard: React.FC = () => {

 

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-3 h-auto">
                <h3 className="text-lg font-semibold text-[#333333] mb-4">Recent Activities</h3>
                <ul>
                  <li className="flex items-center mb-4 pt-2">
                    {/* <div className="bg-[#D9D9D9] w-[24px] h-[24px] mr-2"></div> */}
                    <img src="/assets/activity.svg" alt="notification" className="mr-3 w-[24px] h-auto"/>
                    <div className='flex flex-col '>
                      <span className="text-[#333333] text-sm font-medium">You scored 40% in Quiz XYZ</span>
                      <span className="text-[#AAAAAA] text-sm flex flex-row items-center">
                        <div className='w-[5px] h-[5px] rounded-[100%] bg-[#040BC5] mr-2'></div>
                        <p className='text-[12px] text-[#AAAAAA] font-light'>2 days ago</p>
                      </span>
                    </div>

                  </li>
                  <hr className="mx-[-21px] border-t-3 border-[#F3F5F9] mb-2" />
                  <li className="flex items-center mb-4 pt-2">
                    {/* <div className="bg-[#D9D9D9] w-[24px] h-[24px] mr-2"></div> */}
                    <img src="/assets/activity.svg" alt="notification" className="mr-3 w-[24px] h-auto"/>
                    <div className='flex flex-col '>
                      <span className="text-[#333333] text-sm font-medium">New Course ABC Created</span>
                      <span className="text-gray-400 text-sm flex flex-row items-center">
                        <div className='w-[5px] h-[5px] rounded-[100%] bg-[#040BC5] mr-2'></div>
                        <p className='text-[12px] text-[#AAAAAA] font-light'>2 days ago</p>

                      </span>
                    </div>

                  </li>
                  <hr className="mx-[-21px] border-t-3 border-[#F3F5F9] mb-2" />
                  <li className="flex items-center mb-4 pt-2">
                    {/* <div className="bg-[#D9D9D9] w-[24px] h-[24px] mr-2"></div> */}
                    <img src="/assets/activity.svg" alt="notification" className="mr-3 w-[24px] h-auto"/>
                    <div className='flex flex-col '>
                      <span className="text-[#333333] text-sm font-medium">Completed Module AMP</span>
                      <span className="text-gray-400 text-sm flex flex-row items-center">
                        <div className='w-[5px] h-[5px] rounded-[100%] bg-[#040BC5] mr-2'></div>
                        <p className='text-[12px] text-[#AAAAAA] font-light'>2 days ago</p>

                      </span>
                    </div>

                  </li>
                  <hr className="mx-[-21px] border-t-3 border-[#F3F5F9] mb-2" />

                  <li className="flex items-center pt-2">
                    {/* <div className="bg-[#D9D9D9] w-[24px] h-[24px] mr-2"></div> */}
                    <img src="/assets/activity.svg" alt="notification" className="mr-3 w-[24px] h-auto"/>
                    <div className='flex flex-col '>
                      <span className="text-[#333333] text-sm font-medium">40% improvement in module 234</span>
                      <span className="text-gray-400 text-sm flex flex-row items-center">
                        <div className='w-[5px] h-[5px] rounded-[100%] bg-[#040BC5] mr-2'></div>
                        <p className='text-[12px] text-[#AAAAAA] font-light'>15 days ago</p>

                      </span>
                    </div>

                  </li>
                  {/* <hr className='mx-[-24px] text-[#AAAAAA] h-[0.5px] mb-2' /> */}

                </ul>
              </div>
  );
};

export default RecentActivityCard;
