import React from 'react';


const CourseCardGridNew = () => {
    return (
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md mb-6 w-full flex flex-col">
            <img
                src="../../public/assets/Programming 2.svg"
                alt=""
                className="w-16 h-16 object-contain mb-4"
            />

            <div className="flex items-center text-[12px] font-semibold mb-3">
                <div className="w-[5px] h-[5px] rounded-full bg-[#00ED6D] mr-2"></div>
                <span className="text-[#00ED6D] mr-2">On-Track</span>
                <span className="text-[#AAAAAA] mr-2">|</span>
                <span className="text-[#AAAAAA]">2nd February 2025</span>
            </div>

            <h2 className="text-lg font-semibold text-[#333333] mb-3">
                Python for Data Science
            </h2>

            <p className="text-[#AAAAAA] text-xs mb-4 line-clamp-3 min-h-[4em]">
                Learn how to analyze, visualize, and manipulate data using Python libraries... Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum vel quibusdam blanditiis maxime minima. Sit porro reprehenderit in eos obcaecati quasi ut expedita temporibus, eveniet, illum quibusdam sed maxime repellendus.
            </p>

            <div className="flex items-center mb-3 flex-wrap">
                <div className="w-1/5 bg-gray-200 rounded-full h-[5px] mr-2">
                    <div className="bg-[#040BC5] h-[5px] rounded-full w-[24px]"></div>
                </div>
                <span className="text-[#AAAAAA] text-xs mr-1">3 of 8 modules</span>
                <span className="text-[#AAAAAA] text-xs">|</span>
                <img src="../../public/assets/Clock.svg" alt="" className="mx-1 w-4 h-4" />
                <span className="text-[#AAAAAA] text-xs mr-1">4 weeks left</span>
                <span className="text-[#AAAAAA] text-xs mr-1">|</span>
                <span className="text-[#AAAAAA] text-xs font-bold">65(A)</span>
            </div>

            {/* <p className="font-semibold text-sm mb-2">Course Grade -</p> */}

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                <button className="bg-[#040BC5] text-white rounded-md px-5 py-2 w-full sm:w-auto hover:shadow-xl hover:bg-[#CDCEF3] hover:text-[#040BC5] cursor-pointer">
                Resume
                </button>
                <p className="text-[#AAAAAA] text-[12px] font-semibold text-wrap">
                Next Module: Fundamental of Python
                </p>
            </div>
            </div>

    );
};

export default CourseCardGridNew;