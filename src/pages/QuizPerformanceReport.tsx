import React, { useEffect } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import SummaryTags from '../components/SummaryTags';
import ProgressArc from '../components/ProgressArc';
import PerformanceTrend from '../components/PerformanceTrend';
import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from './LoadingPage';
import { useParams } from 'react-router-dom';
import { getQuizReport } from '../features/reportSlice';

const QuizPerformanceReport = () => {
    const { reportData, reportStatus, reportError } = useSelector((state) => state.report);
    const { user, status, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { id } = useParams<{ id: string }>();

    // Now you can use this id for your API calls
    useEffect(() => {
        if (id) {

            dispatch(getQuizReport(id));
        }
    }, [dispatch, reportData.status]);

    let dummyData = [
        { name: "Quiz 1", value: '20' },
        { name: "Quiz 2", value: '30' },
        { name: "Quiz 3", value: '50' },
        { name: "Quiz 4", value: '45' },
        { name: "Quiz 5", value: '60' },
        { name: "Quiz 6", value: '75' },
        { name: "Quiz 7", value: '90' },
    ];
    console.log(reportStatus);

    if (reportStatus == 'loading' || reportStatus == 'idle' || reportData.status == 'processing') {

        return <LoadingPage content='Fetching Report Details Please Be Patient' />
    }
    dummyData = reportData.data.trend.map((trend, index) => {
        return { name: `Attempt ${trend.attemptNumber}`, value: trend.percentage.slice(0, -1) }
    });
    console.log(reportData, reportStatus);

    return (
        <div>
            <h2 className="text-2xl font-semibold text-[#333333] mt-6 ml-4 mb-3">
                Hi {user.data.name}, this is how you performed on this quiz;
            </h2>

            <div className='bg-white p-6 shadow-lg rounded-3xl mt-8 mb-6 mx-4'>
                <h3 className='font-semibold text-[#333333] text-xl mb-3'>Quiz {reportData.data.quizId}</h3>
                <div className="flex flex-wrap items-center text-xs text-[#AAAAAA] mb-4 space-x-2">
                    <span>2nd February 2025</span>
                    <span>|</span>
                    <img src="../../public/assets/Difficulty.svg" alt="Difficulty" className="w-4 h-4" />
                    <span>Medium</span>
                    <span>|</span>
                    <img src="../../public/assets/Clock.svg" alt="" className='mx-1' />
                    <span>  Duration: 30 mins </span>
                    <span>|</span>
                    <img src="../../public/assets/Quiz3.svg" alt="Questions" className="w-4 h-4" />
                    <span>5 questions</span>
                </div>

                <div className='flex flex-row gap-6'>
                    <div className="mb-2 flex flex-wrap">
                        <span className="text-[#AAAAAA] text-[15px] mr-1">Course:</span>
                        <span className="text-[#333333] font-semibold text-[15px]">{reportData.data.courseName}</span>
                    </div>
                    <div className="mb-4 flex flex-wrap">
                        <span className="text-[#AAAAAA] text-[15px] mr-1">Module:</span>
                        <span className="text-[#333333] font-semibold text-[15px]">
                            {reportData.data.moduleName}
                        </span>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-[auto_auto_auto] gap-6 md:gap-6 p-4 max-w-7xl mx-auto mt-6'>
                <div className='shadow-lg p-6 rounded-2xl flex flex-col items-center justify-center'>
                    <CircularProgressbar className='h-[150px] font-semibold' value={reportData.data.percentage} text={`${reportData.data.percentage}%`} styles={buildStyles({
                        textColor: '#333333',
                        pathColor: '#040BC5',
                        trailColor: '#E5E7EB',
                        textSize: '24px',
                    })} />
                    <p className='mt-4 text-[#333333] font-semibold text-md'> Total Score</p>

                </div>
               
                <PerformanceTrend data={dummyData} improvement={12} />
                <ProgressArc correct={reportData.data.correctAnswers} total={reportData.data.totalQuestions} />
            </div>

            <h1 className='font-semibold text-[#333333] text-2xl p-4 my-3'>Key Takeaways ({reportData.data.aiSummary})</h1>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 max-w-7xl mx-auto mt-6 pl-4'>
                <SummaryTags topic='Strongest Area:' subTopic={reportData.data.strongestArea} good={true} remark='90%' subremark='Correct' />
                <SummaryTags topic='Fastest Topic:' subTopic={reportData.data.goodAt} good={true} remark='Avg 8 sec' subremark='Taken' />
                <SummaryTags topic='Weakest Area:' subTopic={reportData.data.weakestArea} good={false} remark='50%' subremark='correct' />
                <SummaryTags topic='Struggled With:' subTopic={`${reportData.data.struggledWith[0]} & ${reportData.data.struggledWith[1]}`} good={false} remark='50%' subremark='correct' />
            </div>

            <h1 className='font-semibold text-[#333333] text-2xl p-4 mt-6'>Personalized Study Recommendations</h1>
            <div className='shadow-lg rounded-bg-white px-6 py-8 rounded-2xl h-auto mx-4' >
                <p className='text-sm text-[#AAAAAA]'>Based on Incorrect Answers & Weak Areas</p>
                <div className='flex flex-col md:flex-row gap-6 mt-3'>
                    <div className="bg-white py-4 px-5 rounded-xl shadow-sm w-auto lg:w-[40%]">
                        <ul>
                            <li className=" text-[#333333] font-semibold text-[16px] mb-4">Recommended topics to review:</li>
                            <hr className="mx-[-21px] border-t-3 border-[#F3F5F9] mb-2" />
                            {reportData.data.aiRecommendations.topics.map((recommendation, index) => {
                                return (
                                    <>
                                    <li key={index} className="my-3 py-2">
                                        <div>
                                            <p className='text-[#333333] font-semibold text-[16px] mb-2'>{recommendation.title}</p>
                                            <p className='text-[#333333] text-sm'>{recommendation.description}</p>
                                            <button className="bg-white font-semibold text-[#040BC5] text-sm border-2 mt-4 border-[#040BC5]  px-3 py-2 rounded-[8px] hover:shadow-xl hover:bg-[#CDCEF3] hover:text-[#040BC5] cursor-pointer">Retake Quiz</button>

                                        </div>
                                    </li>
                                    <hr className="mx-[-21px] border-t-3 border-[#F3F5F9] mb-2" />
                                    </>
                                    
                                );
                            })}
                           
                        </ul>
                    </div>
                    <div className="bg-white py-4 px-5 rounded-xl shadow-sm w-auto lg:w-[40%]">
                        <ul>
                            <li className="text-[#333333] font-semibold text-[16px] mb-4">Suggested study materials:</li>
                            <hr className="mx-[-21px] border-t-3 border-[#F3F5F9] mb-2" />
                            {reportData.data.studyMaterials.map((recommendation, index) => {
                                return (
                                    <>
                                    <li key={index} className="my-3 py-2">
                                        <div>
                                            <p className='text-[#333333] font-semibold text-[16px] mb-2'>{recommendation.title}</p>
                                            <p className='text-[#333333] text-sm'>{recommendation.description}</p>
                                            <button className="bg-white font-semibold text-[#040BC5] text-sm border-2 mt-4 border-[#040BC5]  px-3 py-2 rounded-[8px] hover:shadow-xl hover:bg-[#CDCEF3] hover:text-[#040BC5] cursor-pointer">Retake Quiz</button>

                                        </div>
                                    </li>
                                    <hr className="mx-[-21px] border-t-3 border-[#F3F5F9] mb-2" />
                                    </>
                                    
                                );
                            })}
                            
                            
                        </ul>
                    </div>
                </div>

            </div>



        </div>
    );
};

export default QuizPerformanceReport;