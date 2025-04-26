import React, { useEffect } from 'react';
import RecommendationCard from '../components/RecommendationCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import QuizCardList from '../components/QuizCardList';
import { Heading1 } from 'lucide-react';
import { createNewQuiz, resetQuizStatus } from '../features/quizSlice';
import LoadingPage from './LoadingPage';
import { getModuleDetail } from '../features/moduleDetailSlice';
import { getSingleCourse, markCompleted, resetCourseDetailStatus } from '../features/courseDetailSlice';
import Swal from 'sweetalert2';
import { getRecommendation } from '../features/recommendationSlice';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { markModuleCompleted, resetModuleStatusStatus } from '../features/moduleStatusSlice';


const ModuleDetailsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {moduleDetailData, moduleDetailStatus, moduleDetailError} = useSelector((state) => state.moduleDetail)
    const { course, status, error } = useSelector((state) => state.courseDetail);
    const { moduleStatusData, moduleStatusStatus, moduleStatusError } = useSelector((state) => state.moduleStatus);
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(getRecommendation())
                const moduleData = await dispatch(getModuleDetail(id)).unwrap();
                if (moduleData?.data.courseId) {
                    await dispatch(getSingleCourse(moduleData.data.courseId));
                }
            } catch (error) {
                // Handle error
            }
        };
        
        fetchData();
    }, [moduleStatusStatus]);
    
    const takeQuizHandler = () => {
        navigate('/dashboard/module-details-new-start');
        
        
        
    }; 
    
    
    const viewInsightHandler = () => {
        navigate('/dashboard/performance-report');
    };     
    if (moduleDetailStatus == 'idle' || moduleDetailStatus == 'loading' || status == 'loading' || status == 'idle') {
        return <LoadingPage content = 'Loading Module'/>
    } 
    
    let progress = 0
    if (course.data.learningSummary.totalModules != 0){
        progress = course.data.learningSummary.completedModules / course.data.learningSummary.totalModules * 100;
    }
    const markCompleteHandler = () => {
    Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to take quizes!",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#D42953',
            cancelButtonColor: '#666666',
            confirmButtonText: 'Yes, I\'m sure!',
            background: '#ffffff',
            backdrop: `rgba(0,0,0,0.4)`,
            customClass: {
                container: 'blur-background'
                   }
               }).then((result) => {
                   if (result.isConfirmed) {
                       dispatch(markModuleCompleted(moduleDetailData.data._id))
                       if(moduleStatusStatus == 'success'){
                           Swal.fire(
                               'Completed!',
                               'Your course has been marked complete.',
                               'success'
                           );

                       }
                       if(moduleStatusStatus == 'failed'){
                        Swal.fire(
                            'Error!',
                            `${moduleStatusError}`,
                            'error'
                        );

                        dispatch(resetModuleStatusStatus())

                    }
                    }
                });
            }
            const moduleStatus = moduleDetailData.data.moduleStatus;
    return (
        <div className='flex flex-row justify-between items-start backdrop-blur-2xl'>
            <div className='w-[75%] me-3'>
                <p className='text-base text-[#333333] mb-6'><a href="/dashboard/view-courses" className='cursor-pointer cursor-pointer'  onClick={() => {navigate('/dashboard/view-courses'); dispatch(resetCourseDetailStatus());}}>Courses</a> &nbsp; &gt; &nbsp; {course.data.title} &nbsp; &gt;</p>
                <p className='font-semibold text-[14px] text-[#aaaaaa] mb-3'>Module {moduleDetailData.data.order} &nbsp;&nbsp;|&nbsp;&nbsp; Course: {course.data.title}</p>
                <h2 className='font-semibold text-[#333333] text-3xl mt-6 mb-2 leading-loose'>{moduleDetailData.data.title}</h2>
                <p className='text-[#AAAAAA] text-lg max-w-[95%] mb-3 min-h-[4em]'>{moduleDetailData.data.description}</p>
                <div className='flex flex-row items-center mt-5 mb-[17px]'>
                    <div className={`w-[5px] h-[5px] rounded-[100%] bg-[${moduleStatus == 'late' ? '#c51104' :'#00ED6D'}] mr-2`}></div>
                    <span className={`text-[${moduleStatus == 'late' ? '#c51104' :'#00ED6D'}] mr-2 text-[12px] font-semibold`}>{moduleDetailData.data.moduleStatus}</span>
                    <span className='text-[#AAAAAA] text-sm'> | </span>
                    <img src="/assets/Quiz3.svg" alt="" className='mx-1' />
                    <span className="text-[#AAAAAA] text-sm">  {moduleDetailData.data.quizzes.length} Quizzes |</span>
                    <img src="/assets/Clock.svg" alt="" className='mx-1' />
                    <span className="text-[#AAAAAA] text-sm">  {Math.floor(moduleDetailData.data.timeLeft )}  Weeks Left  </span>
                </div>
                {/* <div className="flex items-center mb-4">
                    <div className="w-[132px] bg-gray-200 rounded-full h-2 mr-2 ">
                        <div style={{ width: `${progress}%` }} className="bg-[#040BC5] h-2 rounded-full w-[76px]"></div>
                    </div>
                    <span className="text-[#AAAAAA] text-sm">{progress}% completed | </span>
                    <img src="/assets/Difficulty.svg" alt="" className='mx-1' />
                    <span className="text-[#AAAAAA] text-sm">  {course.data.quizConfig.difficultyLevel} |</span>
                    <img src="/assets/Quiz3.svg" alt="" className='mx-1' />
                    <span className="text-[#AAAAAA] text-sm">  {moduleDetailData.data.quizzes.length} Quizes |</span>
                    <img src="/assets/Clock.svg" alt="" className='mx-1' />
                    <span className="text-[#AAAAAA] text-sm">  {course.data.quizConfig.timeDuration % 60} mins left  </span>
                </div> */}
                <div className='flex flex-row mt-6'>
                    <button className="bg-[#040bc5] border-2 border-[#040bc5] cursor-pointer text-white text-base px-4 py-2 rounded-md mr-3 hover:shadow-lg hover:bg-[#585CD8] hover:border-[#585CD8] cursor-pointer" onClick={() => takeQuizHandler()}>Take Quiz</button>

                    <button onClick={() => markCompleteHandler()} className="border-2 border-[#040BC5] text-[#040BC5] px-4 py-2 rounded-lg mr-2 hover:shadow-xl hover:border-[#00ED6D] hover:text-[#333] cursor-pointer">Mark as Complete</button>
                </div>
                <h2 className='font-semibold text-[#333333] text-2xl mt-10 mb-6'>Quiz History</h2>
                {moduleDetailData.data.quizzes.length == 0 ? <p>No Quiz Taken Yet</p> : moduleDetailData.data.quizzes.map((quiz, index) => {
                    return <QuizCardList key={index} quiz={quiz} />
                })}
                
              
            </div>
            <div className="min-w-[20%]">
                <div>
                    <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-md flex items-center space-x-4 my-4">
                    <div className='h-[74px] w-[74px]'>
      <CircularProgressbar
        value= {moduleDetailData.data.courseGrade ? moduleDetailData.data.courseGrade : ''}
        text= {moduleDetailData.data.courseGrade ? moduleDetailData.data.courseGrade + "%" : ''}
        styles={buildStyles({
          textSize: '24px',
          pathColor: '#040BC5',
          textColor: '#111827',
          trailColor: '#e5e7eb',
        })}
      />
    </div>

                        <div>
                                  
                            <div className="text-lg font-semibold">Score</div>
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