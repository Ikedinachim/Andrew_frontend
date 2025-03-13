import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReportCard = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/dashboard/quiz-performance-report');
    };
    return (
        <div className='max-w-[517px] rounded-3xl p-5 shadow-md' onClick={ () => handleClick()}>
                <h3 className='font-semibold text-[#333333] text-xl'>Quiz XYZ</h3>
                <div className="flex items-center mb-4">

                    <span className="text-[#AAAAAA] text-sm">  2nd Febuary 2025  | </span>
                    <img src="../../src/assets/Difficulty.svg" alt="" className='mx-1' />
                    <span className="text-[#AAAAAA] text-sm">  Medium |</span>
                    <img src="../../src/assets/Quiz3.svg" alt="" className='mx-1' />
                    <span className="text-[#AAAAAA] text-sm">  5 questions |</span>
                </div>
                <div className='flex flex-row'>
                    <p className='text-[#AAAAAA] font-semibold text-[16px] mr-1'>Course Name- </p>
                    <p className='font-semibold text-[16px] text-[#333333]'>Masterclass of Python</p>
                </div>
                <div className='flex flex-row mb-4'>
                    <p className='text-[#AAAAAA] font-semibold text-[16px] mr-1'>Module Name- </p>
                    <p className='font-semibold text-[16px] text-[#333333]'>Introduction to Python for Data Science</p>
                </div>
                <p className='font-semibold text-[16px] text-[#333333]'>Score-</p>

            </div>
    );
};

export default ReportCard;