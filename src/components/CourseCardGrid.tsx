import React from 'react';

const CourseCardGrid = (props) => {
    return (
        <div className="bg-white p-6 rounded-md shadow-md mb-6 pr-0  h-[334px] w-[334px]   flex flex-col ">
                            <img src={props.img} alt="" className='w-16 h-64 mb-[33px]' />
                            {/* <div className=''> */}
                            <p className='text-[12px] font-semibold '>
                                <div className='flex flex-row items-center'>

                                    <div className='w-[5px] h-[5px] rounded-[100%] bg-[#040BC5] mr-2'></div>
                                    <span className='text-[#040BC5] mr-2'>New</span>
                                    <span className='text-[12px] text-[#AAAAAA] mr-2'>  |  </span>
                                    <span className='text-[12px] text-[#AAAAAA]'>  2nd Febuary 2025</span>
                                </div>
                            </p>
                            <h2 className="text-xl font-semibold text-[#333333]">
                                {props.title}
                            </h2>
                            <p className="text-[#AAAAAA] mb-1">
                               {props.content}
                            </p>
                            <div className="flex items-center mb-4">

                                <span className="text-[#AAAAAA] text-sm">{props.modules} modules | </span>
                                <img src="../../src/assets/Clock.svg" alt="" className='mx-1' />
                                <span className="text-[#AAAAAA] text-sm">  {props.weeks} weeks left</span>
                            </div>

                            <div className="flex justify-between items-center w-[60%]">
                                <button className="bg-white font-medium text-[#333333] border shadow-md border-[#AAAAAA] px-3 py-2 rounded-[8px]">Learn more</button>
                            </div>

                            {/* </div> */}
                        </div>
    );
};

export default CourseCardGrid;