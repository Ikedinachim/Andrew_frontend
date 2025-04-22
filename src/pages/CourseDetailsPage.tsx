import React, { useEffect, useState } from 'react';
import RecommendationCard from '../components/RecommendationCard';
import { useDispatch, useSelector } from 'react-redux';
import QuizDropDown from '../components/QuizDropDown';
import LoadingPage from './LoadingPage';
import PdfCard from '../components/PdfCard';
import { generateModule, getModules, resetModuleStatus } from '../features/moduleSlice';
import ModuleCard from '../components/ModuleCard';
import ModuleListCard from '../components/ModuleListCard';
import Swal from 'sweetalert2';
import { deleteCourse } from '../features/courseDetailSlice';
import { useNavigate } from 'react-router-dom';

const CourseDetailsPage = () => {
    const [difficulty, setDifficulty] = useState("easy");
    const [isTimed, setIsTimed] = useState(false);
    const [minutes, setMinutes] = useState('00');
    const [hours, setHours] = useState('00');
    const [loading, setLoading] = useState(false);
    const [tab, selectTab] = useState(0)
    const dispatch = useDispatch()
    const [showDialog, setShowDialog] = React.useState(false);
    const cancelRef = React.useRef();
    const open = () => setShowDialog(true);
    const close = () => setShowDialog(false);
    const navigate = useNavigate()
    let currentDate = ""
    const { course, status, error } = useSelector((state) => state.courseDetail);
    const { moduleData, moduleStatus, moduleError } = useSelector((state) => state.module);
    // Example: 0–23 hours
    const hourOptions = Array.from({ length: 24 }, (_, i) => {
        const value = i.toString().padStart(2, '0');
        return value;
    });
    const tabClick = (index: number) => {
        selectTab(index)
    }

    const generateModuleHandler = (id) => {
        setLoading(true)
        dispatch(generateModule(id))
        setLoading(false)
    }
    // Example: 0–59 minutes
    const minuteOptions = Array.from({ length: 60 }, (_, i) => {
        const value = i.toString().padStart(2, '0');
        return value;
    });
    
    const options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];
    // useEffect(() => {
    //     console.log('use effect getModules()');
        
    //     dispatch(getModules(course.data._id))
    // }, [dispatch])
    if (status == 'loading' || status == 'idle') {
        return <LoadingPage content = 'Loading Course' />
    }
    if (moduleStatus == 'loading' || moduleStatus == 'idle') {
        return <LoadingPage content = 'Generating Modules' />
    }
  

    if (moduleStatus == 'failed'){
        alert( `Module creation failed: ${moduleError}`)
        dispatch(resetModuleStatus())
    }
    
    
    
    const date = new Date(course.data.createdAt);
    
    const optionDate = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', optionDate);
    console.log(moduleData)

    // convert time duration to hours and minute 
    const time_in_minutes = course.data.quizConfig.timeDuration;
    const hoursDuration = Math.floor(time_in_minutes / 60);
    const normalizedHours = hoursDuration % 24; // Ensures value is between 0-23
    const formattedHours = normalizedHours.toString().padStart(2, '0');
    const normalizedMinutes = time_in_minutes % 60;
    const formattedMinutes = normalizedMinutes.toString().padStart(2, '0');
    
    const handleDeleteCourse = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#D42953',
            cancelButtonColor: '#666666',
            confirmButtonText: 'Yes, delete it!',
            background: '#ffffff',
            backdrop: `rgba(0,0,0,0.4)`,
            customClass: {
                container: 'blur-background'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCourse(course.data._id))
                navigate('/dashboard')
                Swal.fire(
                    'Deleted!',
                    'Your course has been deleted.',
                    'success'
                );
            }
        });
    };
    

    return (
        <div className='flex flex-row justify-between items-start backdrop-blur-2xl'>
            <div>
                <div className='flex flex-row  max-w-[780px] justify-between'>
                    <p className='text-[16px] text-[#333333]'>Courses  </p>
                    <div className='w-[192px] flex flex-row items-center justify-between mt-2' >
                        <div className='text-[#D42953] text-[12px] flex flex-row cursor-pointer' onClick={() => handleDeleteCourse()}>
                            <img src="/assets/Bin.svg" alt="" />
                            <p>Delete Course</p>
                        </div>
                        <div className='text-[#040BC5] text-[12px] flex flex-row cursor-pointer' onClick={() => {navigate('/dashboard/edit-new-course')}} >
                            <img src="/assets/Edit.svg" alt="" />
                            <p>Edit Course</p>
                        </div>
                    </div>
                </div>
                <h2 className='font-semibold text-[#333333] text-[32px] *:'>{course.data.title}</h2>
                <p className='text-[#AAAAAA] text-xl max-w-[732px]'>
                    {course.data.description}
                </p>
                <p className='text-[12px] font-semibold '>
                    <div className='flex flex-row items-center my-4'>
                        <div className='w-[5px] h-[5px] rounded-[100%] bg-[#00ED6D] mr-2'></div>
                        <span className='text-[#00ED6D] mr-2'>On-Track</span>
                        <span className='text-[12px] text-[#AAAAAA] mr-2'>  |  </span>
                        <span className='text-[12px] text-[#AAAAAA]'>  {formattedDate}</span>
                    </div>
                </p>
                <div className="flex items-center mb-4">
                    <div className="w-[132px] bg-gray-200 rounded-full h-2.5 mr-2 ">
                        <div className="bg-[#040BC5] h-2.5 rounded-full w-[76px]"></div>
                    </div>
                    <span className="text-[#AAAAAA] text-sm">3 completed | </span>
                    <img src="/assets/Clock.svg" alt="" className='mx-1' />
                    <span className="text-[#AAAAAA] text-sm">  4 weeks left | </span>
                    <img src="/assets/Quiz3.svg" alt="" className='mx-1' />
                    <span className="text-[#AAAAAA] text-sm">  8 modules</span>
                </div>
                <p className='font-semibold mb-2 '>Current Grade- </p>
                <button onClick={() => generateModuleHandler(course.data._id)} className="bg-[#040BC5] text-white px-4 py-2 rounded-md mr-2">Continue Learning</button>

                <div className='max-w-[495px] flex flex-row justify-between mt-10 mb-8'>
                    <div className='flex flex-col items-start justify-start ' onClick={() => tabClick(0)}>
                        <p className={`font-semibold text-2xl ${tab == 0 ? 'text-[#040BC5]' : 'text-[#AAAAAA] cursor-pointer'}`} >Learning Plan</p>
                        {tab == 0 && <hr className='w-full h-1 rounded-[10px] bg-[#040BC5] mt-1.5 cursor-pointer' />}

                    </div>
                    <div className='flex flex-col items-start justify-start ' onClick={() => tabClick(1)}>
                        <p className={`font-semibold text-2xl ${tab == 1 ? 'text-[#040BC5]' : 'text-[#AAAAAA] cursor-pointer'}`} >Materials</p>
                        {tab == 1 && <hr className='w-full h-1 rounded-[10px] bg-[#040BC5] mt-1.5 cursor-pointer' />}

                    </div>
                    <div className='flex flex-col items-start justify-start ' onClick={() => tabClick(2)}>
                        <p className={`font-semibold text-2xl ${tab == 2 ? 'text-[#040BC5]' : 'text-[#AAAAAA] cursor-pointer'}`}>Quiz Configuration</p>
                        {tab == 2 && <hr className='w-full h-1 rounded-[10px] bg-[#040BC5] mt-1.5 cursor-pointer' />}
                    </div>
                </div>

                {tab == 0 && <div>
                    {moduleData?.data?.modules?.slice().sort((a, b) => a.order - b.order).map((module, index) => {
                        return <ModuleListCard title = {module.title} description = {module.description} order = {module.order} _id = {module._id}/>
                    })}

                   {moduleData.data.modules.length == 0 ? <h1 className=''>There are no modules for this course yet! Click Continue Learning to Generate Modules</h1> : <></>}
                </div>}
                {tab == 1 && <div>
                    {
                        course.data.materials.map((material) => {
                            return <PdfCard title={material.title} description={material.description} type={material.type} />
                        })
                    }
                {course.data.materials.length == 0 && <h1 className=''>There are no materials for this course yet! Please add Materials</h1>}

                </div>}

                {tab == 2 && <div>
                    <div className="flex flex-row border  bg-[#f3f5f9] border-[#cdcef3] relative text-[16px]  p-4 rounded-[8px] mb-6 min-h-[87px] max-w-[712px] items-center text-[#333333] ">
                        <img src="/assets/Quiz1.svg" alt="hands" className='mr-[24px]' />
                        <p>This quiz configuration will be applied to all modules and quizzes you take for the course.
                            You can change config for a specific quiz before starting the quiz.</p>
                        <img src="/assets/Close.svg" alt="close" className='absolute top-[8px] right-[8px]' />
                    </div>
                    <div className="flex flex-col">
                        <div className=" mt-4 text-[16px] text-[#aaaaaa] w-[477px] h-[48px] rounded-xl border border-[#aaaaaa] px-3 py-4 flex items-center">
                            <input type="text" name="" id="" readOnly placeholder={`Selected Quiz Types - (${course.data.quizConfig.quizTypes[0]})`} className="focus:outline-0 w-full" />

                        </div>
                        <div className=" mt-4 text-[16px] text-[#aaaaaa] w-[477px] h-[48px] rounded-xl border border-[#aaaaaa] px-3 py-4 flex items-center">
                            <input type="text" name="" id="" readOnly placeholder={course.data.quizConfig.numberOfQuestions} className="focus:outline-0 w-full" />

                        </div>
                    </div>
                    <div className="flex items-end gap-6  w-full mt-4 ">
                        <div>
                            <h3 className="text-lg font-semibold">Difficulty Level:</h3>
                            <div className="flex gap-4 mt-2">
                                {['Easy', 'Medium', 'Hard'].map(level => (
                                    <label key={level} className="flex items-center gap-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            value={course.data.quizConfig.difficultyLevel}
                                            checked={course.data.quizConfig.difficultyLevel === level}
                                            // onChange={() => setDifficulty(level)}
                                            className="hidden"
                                        />
                                        <span className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${course.data.quizConfig.difficultyLevel === level ? 'border-black' : 'border-gray-400'}`}>
                                            {course.data.quizConfig.difficultyLevel === level && <span className="w-2 h-2 bg-black rounded-full"></span>}
                                        </span>
                                        {level.charAt(0).toUpperCase() + level.slice(1)}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 ml-3">
                            <span className="text-sm font-medium">Timed</span>
                            <div
                                className={`w-12 h-6 flex items-center bg-[#040bc5] rounded-full p-1 cursor-pointer ${course.data.quizConfig.isTimed ? 'justify-end' : 'justify-start'}`}
                            // onClick={() => setIsTimed(!isTimed)}
                            >
                                <div className="w-4 h-4 bg-white rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">Not Timed</span>
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                            <label className="font-semibold text-gray-700">Select Time Duration</label>
                            <div className="flex items-center space-x-2">
                                {/* Hours */}
                                <select
                                    value={formattedHours}
                                    // onChange={(e) => setHours(e.target.value)}
                                    className="border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 text-gray-700"
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
                                    value={formattedMinutes}
                                    onChange={(e) => setMinutes(e.target.value)}
                                    className="border border-gray-200 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 text-gray-700"
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
                </div>}

            </div>
            <div className='flex flex-col align-center'>
                <img src="/assets/Programming3.svg" alt="" className='w-[166px] h-[166px] m-auto' />
                <RecommendationCard />

            </div>
        </div>
    );
};

export default CourseDetailsPage;