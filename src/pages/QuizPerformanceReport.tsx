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
    const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();
  
  // Now you can use this id for your API calls
  useEffect(() => {
    if (id) {
      dispatch(getQuizReport(id));
    }
  }, [id, dispatch]);

    let dummyData = [
        { name: "Quiz 1", value: '20' },
        { name: "Quiz 2", value: '30' },
        { name: "Quiz 3", value: '50' },
        { name: "Quiz 4", value: '45' },
        { name: "Quiz 5", value: '60' },
        { name: "Quiz 6", value: '75' },
        { name: "Quiz 7", value: '90' },
      ];
      if (reportStatus == 'loading' || reportStatus == 'idle' || reportStatus == 'processing') {
          return <LoadingPage content='Fetching Report Details Please Be Patient' />
        }
        dummyData = reportData.data.trend.map((trend, index) => {
          return {name: `Attempt ${trend.attemptNumber}`, value: trend.percentage.slice(0,-1)}});
    console.log(reportData);
    
    return (
        <div>
            <h1 className='font-semibold text-[#333333] text-2xl'>Hi Joe, this is how you performed on this quiz,</h1>

            <div className=' rounded-3xl p-5 shadow-md'>
                <h3 className='font-semibold text-[#333333] text-xl'>Quiz XYZ</h3>
                <div className="flex items-center mb-4">

                    <span className="text-[#AAAAAA] text-sm">  2nd Febuary 2025  | </span>
                    <img src="../../src/assets/Difficulty.svg" alt="" className='mx-1' />
                    <span className="text-[#AAAAAA] text-sm">  Medium |</span>
                    <img src="../../src/assets/Clock.svg" alt="" className='mx-1' />
                    <span className="text-[#AAAAAA] text-sm">  Duration: 30 mins |</span>
                    <img src="../../src/assets/Quiz3.svg" alt="" className='mx-1' />
                    <span className="text-[#AAAAAA] text-sm">  {reportData.data.totalQuestions} questions </span>
                </div>
                <div className='flex flex-row'>
                    <div className='flex flex-row mr-8'>
                        <p className='text-[#AAAAAA] font-semibold text-[16px] mr-1'>Course Name- </p>
                        <p className='font-semibold text-[16px] text-[#333333]'>{reportData.data.courseName}</p>
                    </div>
                    <div className='flex flex-row'>
                        <p className='text-[#AAAAAA] font-semibold text-[16px] mr-1'>Module Name- </p>
                        <p className='font-semibold text-[16px] text-[#333333]'>{reportData.data.moduleName}</p>
                    </div>
                </div>


            </div>
            <div className='flex flex-row justify-between my-[32px]'>
                <div className='w-[335px] h-[268px] shadow-md p-6 rounded-2xl flex flex-col items-center justify-center'>
                    <CircularProgressbar className='h-[156px] font-semibold' value={reportData.data.percentage} text={`${reportData.data.percentage}%`} styles={buildStyles({
                        textColor: '#333333',
                        pathColor: '#1D4ED8',
                        trailColor: '#E5E7EB',
                        textSize: '24px',
                    })} />
                    <p className='mt-4 text-[#333333] font-semibold text-xl'> Total Score</p>

                </div>
               <PerformanceTrend data={dummyData} improvement={12}/>
               <ProgressArc correct={reportData.data.correctAnswers} total={reportData.data.totalQuestions}  />
            </div>
            <h1 className='font-semibold text-[#333333] text-2xl'>Key Takeaways (AI Summary)</h1>
            <div className='flex flex-row justify-between'>

                <SummaryTags topic='Strongest Area:' subTopic={reportData.data.goodAt} good={true} remark='90%' subremark='Correct' />
                <SummaryTags topic='Fastest Topic:' subTopic='Sorting Algorithms' good={true} remark='Avg 8 sec' subremark='Taken' />
                <SummaryTags topic='Weakest Area:' subTopic='Graph Traversal' good={false} remark='50%' subremark='correct' />
                <SummaryTags topic='Struggled With:' subTopic='DFS vs BFS' good={false} remark='50%' subremark='correct' />
            </div>

            <div className='shadow-md rounded-2xl p-6 ' >
                <h1 className='font-semibold text-2xl text-[#333333] mb-[8px]'>Personalized Study Recommendations</h1>
                <p className='text-[16px] text-[#AAAAAA] mb-[20px] '>Based on Incorrect Answers & Weak Areas</p>
                <div className='flex flex-row justify-between'>
                    <div className="bg-white py-4 px-5 rounded-md shadow-md w-[500px]">
                        <ul>
                            <li className=" text-[#333333] font-semibold text-[16px] mb-4">Recommended topics to review:</li>
                            <hr className='mx-[-20px] text-[#AAAAAA] h-[0.5px]' />
                            <li className="mb-4  ">
                                <div>
                                    <p className='text-[#333333] font-semibold text-[16px] mb-2'>Algorithm Optimization</p>
                                    <p className='text-[#333333] text-[16px] '>50% accuracy, recommended review</p>
                                    <button className="bg-white font-semibold text-[#040BC5] text-[16px] border-2 mt-4 border-[#040BC5]  px-3 py-2 rounded-[8px]">Take Quiz</button>

                                </div>
                            </li>
                            <hr className='mx-[-20px] text-[#AAAAAA] h-[0.5px]' />
                            <li className="mb-4 text-[#333333] font-semibold text-[16px] ">
                                <div>
                                    <p className='text-[#333333] font-semibold text-[16px] mb-2'>Sorting Techniques</p>
                                    <p className='text-[#333333] text-[16px] '>Struggled with Quick Sort vs Merge Sort differences </p>
                                    <button className="bg-white font-semibold text-[#040BC5] text-[16px] border-2 mt-4 border-[#040BC5]  px-3 py-2 rounded-[8px]">Take Quiz</button>

                                </div>
                            </li>
                            <hr className='mx-[-20px] text-[#AAAAAA] h-[0.5px] mb-2' />
                            <li className="mb-4 text-[#333333] font-semibold text-[16px] ">
                                <div>
                                    <p className='text-[#333333] font-semibold text-[16px] mb-2'>Graph Traversal Techniques</p>
                                    <p className='text-[#333333] text-[16px] '>Review BFS & DFS use cases </p>
                                    <button className="bg-white font-semibold text-[#040BC5] text-[16px] border-2 mt-4 border-[#040BC5]  px-3 py-2 rounded-[8px]">Take Quiz</button>

                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white py-4 px-5 rounded-md h-fit shadow-md w-[500px]">
                        <ul>
                            <li className=" text-[#333333] font-semibold text-[16px] mb-4">Suggested study materials:</li>
                            <hr className='mx-[-20px] text-[#AAAAAA] h-[0.5px]' />
                            <li className="mb-4  ">
                                <div>
                                    <p className='text-[#333333] font-semibold text-[16px] mb-2'>Introduction to Algorithms</p>
                                    <p className='text-[#333333] text-[16px] '>Chapter 3- Sorting & Searching</p>

                                </div>
                            </li>
                            <hr className='mx-[-20px] text-[#AAAAAA] h-[0.5px]' />
                            <li className="mb-4 text-[#333333] font-semibold text-[16px] ">
                                <div>
                                    <p className='text-[#333333] font-semibold text-[16px] mb-2'>Youtube Video</p>
                                    <p className='text-[#333333] text-[16px] '>Graph Traversal Explained</p>

                                </div>
                            </li>
                            <hr className='mx-[-20px] text-[#AAAAAA] h-[0.5px] mb-2' />
                            <li className="mb-4 text-[#333333] font-semibold text-[16px] ">
                                <div>
                                    <p className='text-[#333333] font-semibold text-[16px] mb-2'>Practice Quiz</p>
                                    <p className='text-[#333333] text-[16px] '>10 custom questions based on mistakes </p>
                                    <button className="bg-white font-semibold text-[#040BC5] text-[16px] border-2 mt-4 border-[#040BC5]  px-3 py-2 rounded-[8px]">Take Quiz</button>

                                </div>
                            </li>
                            <hr className='mx-[-20px] text-[#AAAAAA] h-[0.5px] mb-2' />
                            <li className=" text-[#333333] font-semibold text-[16px] mb-4">Crash Course on Sorting Algorithms (Coursera)</li>

                        </ul>
                    </div>
                </div>

            </div>



        </div>
    );
};

export default QuizPerformanceReport;