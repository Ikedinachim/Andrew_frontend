import React, { useEffect } from 'react';
import RecommendationCard from '../components/RecommendationCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import QuizCardList from '../components/QuizCardList';
import { Heading1 } from 'lucide-react';
import { createNewQuiz, resetQuizStatus } from '../features/quizSlice';
import LoadingPage from './LoadingPage';

const ModuleDetailsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {moduleDetailData, moduleDetailStatus, moduleDetailError} = useSelector((state) => state.moduleDetail)
    const { course, status, error } = useSelector((state) => state.courseDetail);
    const { quizData, quizStatus, quizError } = useSelector((state) => state.quiz);
    useEffect(() => {
        if (quizStatus == 'success'){
            navigate('/dashboard/module-details-new-start');
            dispatch(resetQuizStatus())
        }
        if (quizStatus == 'failed'){
            alert( `Quiz creation failed: ${quizError}`)
            dispatch(resetQuizStatus())
        }
        
    }, [quizStatus])
    const takeQuizHandler = () => {
        dispatch(createNewQuiz(moduleDetailData.data._id))
        console.log(quizStatus)
        
       
    }; 
    if (quizStatus == 'loading'){
        return <LoadingPage content = 'Genreating Quiz! This might take a while'/>
    }
     
    const viewInsightHandler = () => {
        navigate('/dashboard/performance-report');
    };     
    if (moduleDetailStatus == 'idle' || moduleDetailStatus == 'loading' || status == 'loading' || status == 'idle') {
        return <LoadingPage content = 'Loading Module'/>
    } 
    return (
        <div className='flex flex-row justify-between '>
            <div className=' max-w-[780px]'>

                <p className='text-[16px] text-[#333333] mb-6'>Courses &gt; {course.data.title} &gt;</p>
                <p className='font-semibold text-[14px] text-[#aaaaaa] mb-3'>Module {moduleDetailData.data.order} | Course-{course.data.title}</p>
                <h2 className='text-[32px] text-[#333333] mb-5 font-semibold' >{moduleDetailData.data.title}</h2>
                <p className='text-[20px] text-[#aaaaaa]'>{moduleDetailData.data.description}</p>
                <div className='flex flex-row items-center mt-5 mb-[17px]'>
                    <div className='w-[5px] h-[5px] rounded-[100%] bg-[#00ED6D] mr-2'></div>
                    <span className='text-[#00ED6D] mr-2 text-[12px] font-semibold'>On-Track</span>
                </div>
                <div className="flex items-center mb-4">
                    <div className="w-[132px] bg-gray-200 rounded-full h-2 mr-2 ">
                        <div className="bg-[#040BC5] h-2 rounded-full w-[76px]"></div>
                    </div>
                    <span className="text-[#AAAAAA] text-sm">15% completed | </span>
                    <img src="../../src/assets/Difficulty.svg" alt="" className='mx-1' />
                    <span className="text-[#AAAAAA] text-sm">  Medium |</span>
                    <img src="../../src/assets/Quiz3.svg" alt="" className='mx-1' />
                    <span className="text-[#AAAAAA] text-sm">  {moduleDetailData.data.quizzes.length} Quizes |</span>
                    <img src="../../src/assets/Clock.svg" alt="" className='mx-1' />
                    <span className="text-[#AAAAAA] text-sm">  30 mins left  </span>
                </div>
                <div className='flex flex-row'>
                    <button className="bg-[#040BC5] text-white px-4 py-2 rounded-md mr-2" onClick={() => takeQuizHandler()}>Take Quiz</button>

                    <button className="bg-white border-[#040bc5] border-4 text-[#040bc5] font-semibold text-[16px]   px-4 py-2 rounded-md mr-2">Mark as Complete</button>
                </div>
                <h2 className='font-semibold text-[#333333] text-2xl mt-10 mb-8'>Quiz History</h2>
                {moduleDetailData.data.quizzes.length == 0 ? <p>No Quiz Taken Yet</p> : moduleDetailData.data.quizzes.map((quiz, index) => {
                    return <QuizCardList key={index} quiz={quiz} />
                })}
                
              
            </div>
            <div>

                <div>
                    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md flex items-center space-x-4 my-4">
                        <div className="relative">
                            <svg className="w-16 h-16" viewBox="0 0 64 64">
                                <circle
                                    className="text-gray-200"
                                    stroke-width="8"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="28"
                                    cx="32"
                                    cy="32"
                                />
                                <circle
                                    className="text-blue-500"
                                    stroke-width="8"
                                    stroke-dasharray="176"
                                    stroke-dashoffset="62"
                                    stroke-linecap="round"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="28"
                                    cx="32"
                                    cy="32"
                                />
                                <text
                                    x="50%"
                                    y="50%"
                                    dominant-baseline="middle"
                                    text-anchor="middle"
                                    className="text-sm font-semibold fill-current text-gray-700"
                                >
                                    65%
                                </text>
                            </svg>
                        </div>

                        <div>
                            <div className="text-xl font-bold">Score</div>
                            <div className="text-green-500 text-sm font-medium">+5%</div>
                        </div>
                    </div>
                </div>
                <RecommendationCard />
            </div>

        </div>
    );
};

export default ModuleDetailsPage;