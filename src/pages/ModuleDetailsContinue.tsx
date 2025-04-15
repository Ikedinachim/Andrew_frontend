import React from 'react';

const ModuleDetailsContinue = () => {
    return (
        <div>
            <p className='text-[16px] text-[#333333] mb-6'>Courses &gt; Masterclass of Python &gt;</p>
            <p className='font-semibold text-[14px] text-[#aaaaaa] mb-3'>Module 1 | Course-Masterclass of Python</p>
            <h2 className='text-[32px] text-[#333333] mb-5 font-semibold' >Introduction to Python for Data Science</h2>
            <div className="flex items-center mb-4">
                    <div className="w-[132px] bg-gray-200 rounded-full h-2 mr-2 ">
                        <div className="bg-[#040BC5] h-2 rounded-full w-[76px]"></div>
                    </div>
                    <span className="text-[#AAAAAA] text-sm">15% completed | </span>
                    <img src="../../public/assets/Difficulty.svg" alt="" className='mx-1' />
                    <span className="text-[#AAAAAA] text-sm">  Medium |</span>
                    <img src="../../public/assets/Quiz3.svg" alt="" className='mx-1' />
                    <span className="text-[#AAAAAA] text-sm">  15 Quizes |</span>
                    <img src="../../public/assets/Clock.svg" alt="" className='mx-1' />
                    <span className="text-[#AAAAAA] text-sm">  30 mins left  </span>
                </div>
           
            <h2 className='text-[#333333] font-bold text-xl mt-8'>Quiz Intructions:</h2>
            <ul className='list-disc mt-2'>
                <li className='mb-[11px]'>Read each question carefully before selecting or writing your answer.</li>
                <li className='mb-[11px]'>Multiple-choice questions have four options; select the most appropriate answer.</li>
                <li className='mb-[11px]'>True/False questions require you to choose between "True" or "False" based on your understanding.</li>
                <li className='mb-[11px]'>Maintain proper time management to ensure you complete all questions within the given time.</li>
                <li className='mb-[11px]'>If unsure about an answer, make an educated guess rather than leaving it blank.</li>
                <li className='mb-[11px]'>Stay focused, and avoid external help to test your knowledge honestly.</li>
                <li className='mb-[11px]'>After completing the quiz, review your answers before submission.</li>
                <li className='mb-[11px]'>Enjoy the learning process and use the quiz as a tool for self-improvement!</li>
            </ul>
            <button className="bg-[#040BC5] text-white py-2 px-[12px] rounded-[8px]">
        Continue Quiz
      </button>
        </div>
    );
};

export default ModuleDetailsContinue;