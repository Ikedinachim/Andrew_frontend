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
        <div className='bg-white p-6 rounded-md shadow-md mb-6'>
            <h2 className='text-[#333333] font-semibold text-xl'>{props.quiz.description}</h2>
            <div className="flex items-center mb-4">

                <span className="text-[#AAAAAA] text-sm">{formattedDate} | </span>
                <img src="/assets/Difficulty.svg" alt="" className='mx-1' />
                <span className="text-[#AAAAAA] text-sm">  Medium |</span>
                <img src="/assets/Quiz3.svg" alt="" className='mx-1' />
                <span className="text-[#AAAAAA] text-sm">  {props.quiz.questions.length} Question </span>
            </div>
            <p className='font-semibold mb-2 '>Score- </p>
            <div className='flex flex-row'>
                <button onClick={() => retakeQuizHandler()} className="bg-[#040BC5] cursor-pointer text-white px-4 py-2 rounded-md mr-2">Restart Quiz</button>

                <button className="bg-white cursor-pointer border-[#040bc5] border-4 text-[#040bc5] font-semibold text-[16px]   px-4 py-2 rounded-md mr-2" onClick={() => viewInsightHandler()}>View Insights</button>
            </div>

        </div>
    );
};

export default QuizCardList;