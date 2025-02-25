import React from 'react';

const CourseCardGridNew = () => {
    return (
        <div className="bg-white p-6 rounded-md shadow-md mb-6  h-[334px] w-[334px]    flex flex-col ">
                            <img src="../../src/assets/Programming 2.svg" alt="" className='w-16 h-64 mb-[33px]' />
                            {/* <div className=''> */}
                            <p className='text-[12px] font-semibold '>
                                <div className='flex flex-row items-center'>

                                    <div className='w-[5px] h-[5px] rounded-[100%] bg-[#00ED6D] mr-2'></div>
                                    <span className='text-[#00ED6D] mr-2'>On-Track</span>
                                    <span className='text-[12px] text-[#AAAAAA] mr-2'>  |  </span>
                                    <span className='text-[12px] text-[#AAAAAA]'>  2nd Febuary 2025</span>
                                </div>
                            </p>
                            <h2 className="text-xl font-semibold text-[#333333]">
                                Python for Data Science
                            </h2>
                            <p className="text-[#AAAAAA]">
                                Learn how to analyze, visualize, and manipulate data using
                                Python libraries...
                            </p>
                            <div className="flex items-center mb-2">
                                <div className="w-[76px] bg-gray-200 rounded-full h-[5px] mr-2 ">
                                    <div className="bg-[#040BC5] h-[5px] rounded-full w-[32px]"></div>
                                </div>
                                <span className="text-[#AAAAAA] text-sm">3 of 8 modules | </span>
                                <img src="../../src/assets/Clock.svg" alt="" className='mx-1' />
                                <span className="text-[#AAAAAA] text-sm">  4 weeks left</span>
                            </div>
                            <p className='font-semibold mb-2 '>Course Grade- </p>
                            <div className="flex   flex-row  items-center ">
                                <button className="bg-[#040BC5] text-nowrap text-white text-[14px] rounded-[8px] mr-2 h-9 w-32">Resume Course</button>
                                <p className="text-[#AAAAAA] text-[12px] font-semibold">Next Module: Fundamental of Python</p>
                            </div>

                            {/* </div> */}
                        </div>
    );
};

export default CourseCardGridNew;