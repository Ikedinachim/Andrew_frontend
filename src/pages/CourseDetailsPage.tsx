import React, { useState } from 'react';
import RecommendationCard from '../components/RecommendationCard';
import LearningPath from '../components/LearningPath';
import QuizDropDown from '../components/QuizDropDown';

const CourseDetailsPage = () => {
    const [difficulty, setDifficulty] = useState("easy");
    const [isTimed, setIsTimed] = useState(false);
    const [hours, setHours] = useState('10');
    const [minutes, setMinutes] = useState('00');
    const [tab, selectTab] = useState(0)
    // Example: 0–23 hours
    const hourOptions = Array.from({ length: 24 }, (_, i) => {
      const value = i.toString().padStart(2, '0');
      return value;
    });
    const tabClick = (index: number) => {
        selectTab(index)
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
    return (
        <div className='flex flex-row justify-between items-start '>
            <div>
                <div className='flex flex-row  max-w-[780px] justify-between'>
                    <p className='text-[16px] text-[#333333]'>Courses  </p>
                    <div className='w-[192px] flex flex-row items-center justify-between mt-2' >
                        <div className='text-[#D42953] text-[12px] flex flex-row '>
                            <img src="../../src/assets/Bin.svg" alt="" />
                            <p>Delete Course</p>
                        </div>
                        <div className='text-[#040BC5] text-[12px] flex flex-row' >
                            <img src="../../src/assets/Edit.svg" alt="" />
                            <p>Edit Course</p>
                        </div>
                    </div>
                </div>
                <h2 className='font-semibold text-[#333333] text-[32px] *:'>Python for Data Science</h2>
                <p className='text-[#AAAAAA] text-xl max-w-[732px]'>
                    Master data analysis, visualization, and machine learning using Python
                    libraries like Pandas, NumPy, and Scikit-learn. Learn how
                    to process large datasets and extract meaningful insights
                    for decision-making.
                </p>
                <p className='text-[12px] font-semibold '>
                    <div className='flex flex-row items-center my-4'>

                        <div className='w-[5px] h-[5px] rounded-[100%] bg-[#00ED6D] mr-2'></div>
                        <span className='text-[#00ED6D] mr-2'>On-Track</span>
                        <span className='text-[12px] text-[#AAAAAA] mr-2'>  |  </span>
                        <span className='text-[12px] text-[#AAAAAA]'>  2nd Febuary 2025</span>
                    </div>
                </p>
                <div className="flex items-center mb-4">
                    <div className="w-[132px] bg-gray-200 rounded-full h-2.5 mr-2 ">
                        <div className="bg-[#040BC5] h-2.5 rounded-full w-[76px]"></div>
                    </div>
                    <span className="text-[#AAAAAA] text-sm">3 completed | </span>
                    <img src="../../src/assets/Clock.svg" alt="" className='mx-1' />
                    <span className="text-[#AAAAAA] text-sm">  4 weeks left | </span>
                    <img src="../../src/assets/Quiz3.svg" alt="" className='mx-1' />
                    <span className="text-[#AAAAAA] text-sm">  8 modules</span>
                </div>
                <p className='font-semibold mb-2 '>Current Grade- </p>
                <button className="bg-[#040BC5] text-white px-4 py-2 rounded-md mr-2">Continue Learning</button>

                <div className='max-w-[495px] flex flex-row justify-between mt-10 mb-8'>
                    <div className='flex flex-col items-start justify-start ' onClick={() => tabClick(0)}>
                        <p className={`font-semibold text-2xl ${tab==0 ? 'text-[#040BC5]' : 'text-[#AAAAAA]'}`} >Learning Plan</p>
                        {tab == 0 && <hr className='w-full h-1 rounded-[10px] bg-[#040BC5] mt-1.5' />}

                    </div>
                    <div className='flex flex-col items-start justify-start 'onClick={() => tabClick(1)}>
                        <p className={`font-semibold text-2xl ${tab==1 ? 'text-[#040BC5]' : 'text-[#AAAAAA]'}`} >Materials</p>
                        {tab == 1 && <hr className='w-full h-1 rounded-[10px] bg-[#040BC5] mt-1.5' />}

                    </div>
                    <div className='flex flex-col items-start justify-start 'onClick={() => tabClick(2)}>
                        <p className={`font-semibold text-2xl ${tab==2 ? 'text-[#040BC5]' : 'text-[#AAAAAA]'}`}>Quiz Configuration</p>
                        {tab == 2 && <hr className='w-full h-1 rounded-[10px] bg-[#040BC5] mt-1.5' />}
                    </div>
                </div>

                {tab == 0 && <div>
                <div className="bg-white p-6 rounded-md shadow-md mb-6 relative ">
                <div className='max-w-[712px]'>
                  <p className='text-[12px] font-semibold '>
                    <div className='flex flex-row items-center'>

                      <span className='text-[12px] text-[#AAAAAA]'>Module 1 | </span>
                      <div className='w-[5px] h-[5px] rounded-[100%] bg-[#00ED6D] mx-2'></div>
                      <span className='text-[#00ED6D] mr-2'> On-Track</span>
                    </div>
                  </p>
                  <h2 className="text-xl font-bold text-[#333333]">
                    Introduction to Python for Data Science
                  </h2>
                  <p className="text-[#AAAAAA] w-full text-[16px] ">
                  Sets the foundation by introducing Python as a powerful tool for data analysis. 
                  It covers the basics of Python, including variables, loops, functions, and data types, 
                  while guiding learners th... 
                  </p>
                  <p className='text-[12px] font-semibold mt-3 mb-4 '>
                    <div className='flex flex-row items-center text-[#FEC260]'>

                      <span className='text-[12px] '>Complete module by 02/05 to stay on track |</span>
                      <span className=' mr-2'> 4 weeks left</span>
                    </div>
                  </p>
                 
                  <p className='font-semibold mb-2 '>Current Score- </p>
                    <button className="bg-white border-[#040bc5] border-4 text-[#040bc5] font-semibold text-[16px]   px-4 py-2 rounded-md mr-2">Continue Module</button>
                 

                </div>
              </div>
              
              <div className="bg-white p-6 rounded-md shadow-md mb-6 relative ">
                <div className='max-w-[712px]'>
                  <p className='text-[12px] font-semibold '>
                    <div className='flex flex-row items-center'>

                      <span className='text-[12px] text-[#AAAAAA]'>Module 2 | </span>
                      <div className='w-[5px] h-[5px] rounded-[100%] bg-[#FEC260] mx-2'></div>
                      <span className='text-[#FEC260] mr-2'> To-do</span>
                    </div>
                  </p>
                  <h2 className="text-xl font-bold text-[#333333]">
                  Data Manipulation with Pandas & NumPy
                  </h2>
                  <p className="text-[#AAAAAA] w-full text-[16px] ">
                  Explore essential data structures such as Pandas DataFrames and 
                  NumPy arrays. This module focuses on handling large datasets efficiently, 
                  performing operations like filtering, grouping, an...
                  </p>
                  
                    <button className="bg-white border-[#040bc5] border-4 text-[#040bc5] font-semibold text-[16px]   px-4 py-2 rounded-md mr-2 mt-4">Start Module</button>
                 

                </div>
              </div>
                </div>}
                {tab == 1 && <div>

                <div className=' w-[834px] bg-white shadow-md p-5 relative flex flex-row items-center justify-between mb-6'>
                    <div className='flex flex-row'>

                        <img src="../../src/assets/PDF.svg" alt="" />
                        <div className=' flex flex-col justify-start items-start ml-[23px] max-w-[554px]'>
                            <h2 className='text-xl font-semibold text-[#333333]'>Title</h2>
                            <p className='text-[14px] font-[400px] text-[#333333] '>The Masterclass of Python course is designed to take
                                learners from the basics of Python programming to advanced concepts,
                                making it ideal for both beginners and experience...</p>
                        </div>
                    </div>
                    <p className=' text-[#333333] font-semibold text-[16px]'>Type:PDF</p>

                </div>
                <div className=' w-[834px] bg-white shadow-md p-5 relative flex flex-row items-center justify-between mb-6'>
                    <div className='flex flex-row'>

                        <img src="../../src/assets/url.svg" alt="" />
                        <div className=' flex flex-col justify-start items-start ml-[23px] max-w-[554px]'>
                            <h2 className='text-xl font-semibold text-[#333333]'>Title</h2>
                            <p className='text-[14px] font-[400px] text-[#333333] '>The Masterclass of Python course is designed to take
                                learners from the basics of Python programming to advanced concepts,
                                making it ideal for both beginners and experience...</p>
                        </div>
                    </div>
                    <p className=' text-[#333333] font-semibold text-[16px]'>Type:URL</p>

                </div>
                </div>}

               { tab == 2 && <div>
                    <div className="flex flex-row border  bg-[#f3f5f9] border-[#cdcef3] relative text-[16px]  p-4 rounded-[8px] mb-6 min-h-[87px] max-w-[712px] items-center text-[#333333] ">
                        <img src="../../src/assets/Quiz1.svg" alt="hands" className='mr-[24px]' />
                        <p>This quiz configuration will be applied to all modules and quizzes you take for the course.
                            You can change config for a specific quiz before starting the quiz.</p>
                        <img src="../../src/assets/Close.svg" alt="close" className='absolute top-[8px] right-[8px]' />
                    </div>
                    <div className="flex flex-col">
                        <QuizDropDown options={options} onSelect={(val) => { console.log(val) }} width={'477px'} desc={'Select Quiz Type (can select more than one)'} />
                        <div className=" mt-4 text-[16px] text-[#aaaaaa] w-[477px] h-[48px] rounded-xl border border-[#aaaaaa] px-3 py-4 flex items-center">
                            <input type="text" name="" id="" placeholder="Enter required number of questions" className="focus:outline-0 w-full" />

                        </div>
                    </div>
                    <div className="flex items-end gap-6  w-full mt-4 ">
                        <div>
                            <h3 className="text-lg font-semibold">Difficulty Level:</h3>
                            <div className="flex gap-4 mt-2">
                                {['easy', 'medium', 'hard'].map(level => (
                                    <label key={level} className="flex items-center gap-1 cursor-pointer">
                                        <input
                                            type="radio"
                                            value={level}
                                            checked={difficulty === level}
                                            onChange={() => setDifficulty(level)}
                                            className="hidden"
                                        />
                                        <span className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${difficulty === level ? 'border-black' : 'border-gray-400'}`}>
                                            {difficulty === level && <span className="w-2 h-2 bg-black rounded-full"></span>}
                                        </span>
                                        {level.charAt(0).toUpperCase() + level.slice(1)}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 ml-3">
                            <span className="text-sm font-medium">Timed</span>
                            <div
                                className={`w-12 h-6 flex items-center bg-[#040bc5] rounded-full p-1 cursor-pointer ${isTimed ? 'justify-end' : 'justify-start'}`}
                                onClick={() => setIsTimed(!isTimed)}
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
                                    value={hours}
                                    onChange={(e) => setHours(e.target.value)}
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
                                    value={minutes}
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
                <img src="../../src/assets/Programming3.svg" alt="" className='w-[166px] h-[166px] m-auto' />
                <RecommendationCard />

            </div>
        </div>
    );
};

export default CourseDetailsPage;