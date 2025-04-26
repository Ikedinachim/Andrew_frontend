import React, { useEffect, useRef, useState } from 'react';
import QuizDropDown from '../components/QuizDropDown';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from './LoadingPage';
import axios from 'axios';
import { createNewQuiz, resetQuizStatus } from '../features/quizSlice';
import { resetCourseDetailStatus } from '../features/courseDetailSlice';

const ModuleDetailsNewStart = () => {

    const { course, status, error } = useSelector((state) => state.courseDetail)
    const [quizType, setQuizType] = useState(course.data.quizConfig.quizTypes[0])
    const [difficulty, setDifficulty] = useState(course.data.quizConfig.difficultyLevel);
    const [isTimed, setIsTimed] = useState(course.data.quizConfig.isTimed);
    const [hours, setHours] = useState(course.data.quizConfig.timeDuration / 60);
    const [minutes, setMinutes] = useState(course.data.quizConfig.timeDuration % 60);
    const { quizData, quizStatus, quizError } = useSelector((state) => state.quiz);
    const numberOfQuestionsRef = useRef()
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (quizStatus == 'success') {
    //         navigate('/mcq-page');
    //         dispatch(resetQuizStatus())
    //     }
    //     if (quizStatus == 'failed') {
    //         alert(`Quiz creation failed: ${quizError}`)
    //         dispatch(resetQuizStatus())
    //     }

    // }, [quizStatus])

    const takeQuizHandler = async () => {
        const formData = new FormData();

        formData.append('title', course.data.title);
        formData.append('description', course.data.description);
        formData.append('timeline', String(course.data.timeline)); // timeline must be string
        formData.append('goal', course.data.goal);
        // update quiz type
        formData.append(
            'quizConfig',
            JSON.stringify({
              quizTypes: [quizType],
              numberOfQuestions: +numberOfQuestionsRef.current.value,
              difficultyLevel: difficulty,
              isTimed: isTimed,
              timeDuration: Math.max((parseInt(hours) * 60) + parseInt(minutes), 10)

            })
          );
        try {
            console.log(course.data._id);
            
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/v1/courses/${course.data._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );


            console.log('Success:', response.data);
            dispatch(createNewQuiz(moduleDetailData.data._id))
            navigate('/mcq-page');
            console.log(quizStatus)
        } catch (e) {
            alert(`Error Creating Course`);
            console.log(`Upload error:,  ${e.message}`);
        } finally {

        }


        
    };
    const { moduleDetailData, moduleDetailStatus, moduleDetailError } = useSelector((state) => state.moduleDetail)
    const options = [
        { label: 'True/False', value: 'True/False' },
        { label: 'MCQ', value: 'MCQ' },
        // { label: 'Open-ended', value: 'Open-ended' },
        // { label: 'Coding Exercises', value: 'Coding Exercises' },
    ];

    // Example: 0–23 hours
    const hourOptions = Array.from({ length: 24 }, (_, i) => {
        const value = i.toString().padStart(2, '0');
        return value;
    });

    // Example: 0–59 minutes
    const minuteOptions = Array.from({ length: 60 }, (_, i) => {
        const value = i.toString().padStart(2, '0');
        return value;
    });
    if (moduleDetailStatus == 'loading') {
        return <LoadingPage content='Fetching Module Detail' />
    }
    if (quizStatus == 'loading') {
        return <LoadingPage content='Genreating Quiz! This might take a while' />
    }
    
    return (
        <div className="backdrop-blur-2xl p-4 max-w-[90%]">
            <p className='text-base text-[#333333] mb-6 cursor-pointer'  onClick={() => {navigate('/dashboard/view-courses'); dispatch(resetCourseDetailStatus());}}>Courses &gt; {course.data.title} &gt;</p>
            <p className='font-semibold text-[14px] text-[#aaaaaa] mb-3'>Module {moduleDetailData.data.order} | Course-{course.data.title}</p>
            <h2 className='text-3xl text-[#333333] mb-2 font-semibold leading-loose' >{moduleDetailData.data.title}</h2>
            <div className="flex items-center mb-4">

                {/* <img src="/assets/Difficulty.svg" alt="" className='mx-1' />
                <span className="text-[#AAAAAA] text-sm">  Medium |</span>
                <img src="/assets/Quiz3.svg" alt="" className='mx-1' />
                <span className="text-[#AAAAAA] text-sm">  15 Quizes </span> */}
                {/* <img src="/assets/Clock.svg" alt="" className='mx-1' />
                <span className="text-[#AAAAAA] text-sm">  30 mins left  </span> */}
            </div>

            {/* Quiz Config Notice */}
            <div className="flex flex-row border bg-[#f3f5f9] border-[#cdcef3] relative text-sm px-4 py-6 rounded-md my-4 max-w-full items-center text-[#333333]">
                <img src="/assets/Quiz1.svg" alt="hands" className='mr-[12px]' />
                <p className='text-base leading-6'>This quiz configuration will be applied to all this particular quiz. All other quizzes taken for this module will default to the quiz configuration specified under course details</p>
                {/* <img src="/assets/Close.svg" alt="close" className='absolute top-[8px] right-[8px]' /> */}
            </div>

            <div className="flex flex-row">
                <QuizDropDown selectedVal={quizType} options={options} onSelect={(val) => { setQuizType(val) }} width={'477px'} desc={'Select Quiz Type (can select more than one)'} />

                <div className="text-base text-[#333] w-auto h-[48px] rounded-lg border border-[#aaaaaa] px-3 py-4 flex items-center">
                    <input type="number" min="5" defaultValue={course.data.quizConfig.numberOfQuestions} name="" id="" placeholder="Enter required number of questions" className="focus:outline-0 w-full" ref={numberOfQuestionsRef} />
                </div>
            </div>

            <div className="flex flex-wrap gap-16 w-full mt-5 items-start">
                {/* Select Difficulty Level */}
                <div className="min-w-[20%]">
                    <h3 className="text-base font-semibold mb-3">Difficulty:</h3>
                    <div className="flex gap-4 text-sm pt-0.5">
                        {['Easy', 'Medium', 'Hard'].map(level => (
                            <label key={level} className="flex items-center gap-1 cursor-pointer">
                                <input
                                    type="radio"
                                    value={level}
                                    checked={difficulty === level}
                                    onChange={() => setDifficulty(level)}
                                    className="hidden"
                                />
                                <span className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${difficulty === level ? 'border-[#040BC5]' : 'border-[#AAA]'}`}>
                                    {difficulty === level && <span className="w-2 h-2 bg-[#040BC5] rounded-full"></span>}
                                </span>
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Timed/Not Timed */}
                <div className="min-w-[20%]">
                    <h3 className="text-base font-semibold mb-2">Timing:</h3>
                    <div className="flex items-center gap-3 pt-1">
                        <span className="text-sm font-medium">Not Timed</span>
                        <div
                            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-200 ${isTimed ? 'justify-end bg-[#040BC5]' : 'justify-start bg-[#AAA]'}`}
                            onClick={() => setIsTimed(!isTimed)}
                        >
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">Timed</span>
                    </div>
                </div>
                
                {/* Time Duration */}
                <div className="min-w-[20%]">
                    <label className="text-base font-semibold block mb-2">Duration:</label>
                    <div className="flex gap-2 items-center">
                        {/* Hours */}
                        <select
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            className="border text-sm border-[#AAAAAA] focus:outline-none focus:ring-1 focus:ring-[#040BC5] rounded px-2 py-1.5 text-[#33333 cursor-pointer"
                        >
                            {hourOptions.map((hour) => (
                                <option key={hour} value={hour}>
                                    {hour}
                                </option>
                            ))}
                        </select>

                        <span>:</span>

                        {/* Minutes */}
                        <select
                            value={minutes}
                            onChange={(e) => setMinutes(e.target.value)}
                            className="border text-sm border-[#F3F5F9] bg-[#F3F5F9] focus:outline-none focus:ring-1 focus:ring-[#040BC5] rounded px-2 py-1.5 text-[#333333] cursor-pointer"
                        >
                            {minuteOptions.map((minute) => (
                                <option key={minute} value={minute}>
                                    {minute}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Quiz Instructions */}
            <h2 className='text-[#333333] font-bold text-xl mt-8'>Quiz Intructions:</h2>
            <div className="flex flex-row border bg-[#f3f5f9] border-[#cdcef3] relative text-base pl-10 py-6 rounded-md my-4 max-w-full items-center text-[#333333]">
                <ul className='list-disc mt-2'>
                    <li className='mb-3'>Read each question carefully before selecting or writing your answer.</li>
                    <li className='mb-3'>Multiple-choice questions have four options; select the most appropriate answer.</li>
                    <li className='mb-3'>True/False questions require you to choose between "True" or "False" based on your understanding.</li>
                    <li className='mb-3'>Maintain proper time management to ensure you complete all questions within the given time.</li>
                    <li className='mb-3'>If unsure about an answer, make an educated guess rather than leaving it blank.</li>
                    <li className='mb-3'>Stay focused, and avoid external help to test your knowledge honestly.</li>
                    <li className='mb-3'>After completing the quiz, review your answers before submission.</li>
                    <li className='mb-3'>Enjoy the learning process and use the quiz as a tool for self-improvement!</li>
                </ul>
            </div>
            <button onClick={() => takeQuizHandler()} className="bg-[#040bc5] border-2 border-[#040bc5] text-white text-base px-4 py-2 rounded-md mr-3 hover:shadow-lg hover:bg-[#585CD8] hover:border-[#585CD8] mt-3 cursor-pointer">
                Start Quiz
            </button>
        </div>
    );
};

export default ModuleDetailsNewStart;