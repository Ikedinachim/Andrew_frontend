import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getQuizReport } from '../features/reportSlice';

const ReportCard = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(getQuizReport(props.id))
        navigate(`/dashboard/quiz-performance-report/${props.id}`);
    };
    const date = new Date(props.date);
    
    const optionDate = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', optionDate);
    return (
        <div
            className="bg-white border-1 border-white rounded-3xl px-6 py-7 shadow-lg hover:shadow-xl hover:border-[#040BC5] transition-shadow duration-300 cursor-pointer"
            onClick={handleClick}
            >

            <h3 className="font-semibold text-[#333333] text-xl mb-3">{props.title}</h3>

            <div className="flex flex-wrap items-center text-xs text-[#AAAAAA] mb-4 space-x-2">
                <span>{formattedDate}</span>
                <span>|</span>
                <img src="/assets/Difficulty.svg" alt="Difficulty" className="w-4 h-4" />
                <span>Medium</span>
                <span>|</span>
                <img src="/assets/Quiz3.svg" alt="Questions" className="w-4 h-4" />
                <span>{props.questions} questions</span>
            </div>

            <div className="mb-2 flex flex-wrap">
                <span className="text-[#AAAAAA] text-[15px] mr-1">Course:</span>
                <span className="text-[#333333] font-semibold text-[15px]">Masterclass of Python</span>
            </div>

            <div className="mb-4 flex flex-wrap">
                <span className="text-[#AAAAAA] text-[15px] mr-1">Module:</span>
                <span className="text-[#333333] font-semibold text-[15px]">
                Introduction to Python for Data Science
                </span>
            </div>

            <p className="text-lg text-[#333333] font-bold mr-2">Score - {props.score}</p>
            </div>

                );
            };

export default ReportCard;