import React from 'react';

const QuizCardList = (props) => {
    return (
        <div className='bg-white p-6 rounded-md shadow-md mb-6'>
            <h2 className='text-[#333333] font-semibold text-xl'>Quiz XYZ</h2>
            <div className="flex items-center mb-4">

                <span className="text-[#AAAAAA] text-sm">2nd Febuary 2025 | </span>
                <img src="../../public/assets/Difficulty.svg" alt="" className='mx-1' />
                <span className="text-[#AAAAAA] text-sm">  Medium |</span>
                <img src="../../public/assets/Quiz3.svg" alt="" className='mx-1' />
                <span className="text-[#AAAAAA] text-sm">  5 Quizes </span>
            </div>
            <p className='font-semibold mb-2 '>Score- </p>
            <div className='flex flex-row'>
                <button className="bg-[#040BC5] text-white px-4 py-2 rounded-md mr-2">Restart Quiz</button>

                <button className="bg-white border-[#040bc5] border-4 text-[#040bc5] font-semibold text-[16px]   px-4 py-2 rounded-md mr-2" onClick={() => viewInsightHandler()}>View Insights</button>
            </div>

        </div>
    );
};

export default QuizCardList;