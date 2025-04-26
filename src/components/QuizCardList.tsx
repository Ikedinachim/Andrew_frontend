import React from 'react';
import { useDispatch } from 'react-redux';
import { getQuizReport } from '../features/reportSlice';
import { useNavigate } from 'react-router-dom';
import { retakeQuiz } from '../features/quizSlice';

const QuizCardList = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const date = new Date(props.quiz.createdAt);
    const optionDate = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', optionDate);
    
    const viewInsightHandler = () => {
        dispatch(getQuizReport(props.quiz._id))
        navigate(`/dashboard/quiz-performance-report/${props.quiz._id}`)
    }
    const retakeQuizHandler = () => {
        dispatch(retakeQuiz(props.quiz._id))
        navigate(`/mcq-page`)
    }
    return (
        <div className="bg-white p-7 rounded-2xl shadow-md mb-6 relative mr-6">
            <h2 className="text-lg font-semibold text-[#333333] mb-2">{props.quiz.description}</h2>
            <div className="flex items-center mb-4">
                <span className="text-[#AAAAAA] text-sm mr-3">{formattedDate}</span>
                <span className='text-base text-[#AAAAAA] mr-1 pb-1'>  |  </span>
                <img src="/assets/Difficulty.svg" alt="" className='mx-1' />
                <span className="text-[#AAAAAA] text-sm mr-3">  Medium</span>
                <span className='text-base text-[#AAAAAA] mr-1 pb-1'>  |  </span>
                <img src="/assets/Quiz3.svg" alt="" className='mx-1' />
                <span className="text-[#AAAAAA] text-sm">  {props.quiz.questions.length} Questions </span>
            </div>
            <p className='font-semibold my-3'>Grade: 65(B-) </p>
            <div className='flex flex-row'>
                <button onClick={() => retakeQuizHandler()} className="bg-[#040bc5] border-2 border-[#040bc5] cursor-pointer text-white text-base px-4 py-2 rounded-lg mr-3 hover:shadow-lg hover:bg-[#585CD8] hover:border-[#585CD8] cursor-pointer">Retake Quiz</button>

                <button className="border-2 cursor-pointer border-[#040BC5] text-[#040BC5] px-4 py-2 rounded-lg mr-2 hover:shadow-xl cursor-pointer" onClick={() => viewInsightHandler()}>View Quiz Report</button>
            </div>

        </div>
    );
};

export default QuizCardList;