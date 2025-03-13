import React, { useRef, useState } from 'react';
import QuizDropDown from '../components/QuizDropDown';
import { useNavigate } from 'react-router-dom';

const ModuleDetailsNewStart = () => {

    const [quizType, setQuizType] = useState('')
    const [difficulty, setDifficulty] = useState("easy");
    const [isTimed, setIsTimed] = useState(false);
    const [hours, setHours] = useState('10');
    const [minutes, setMinutes] = useState('00');

    const numberOfQuestionsRef = useRef()
    const navigate = useNavigate();
    const takeQuizHandler = () => {
        navigate('/mcq-page');
    };      

    const options = [
        { label: 'True/False', value: 'True/False' },
        { label: 'MCQ', value: 'MCQ' },
        { label: 'Open-ended', value: 'Open-ended' },
        { label: 'Coding Exercises', value: 'Coding Exercises' },
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
    return (
        <div>
            <p className='text-[16px] text-[#333333] mb-6'>Courses &gt; Masterclass of Python &gt;</p>
            <p className='font-semibold text-[14px] text-[#aaaaaa] mb-3'>Module 1 | Course-Masterclass of Python</p>
            <h2 className='text-[32px] text-[#333333] mb-5 font-semibold' >Introduction to Python for Data Science</h2>
            <div className="flex items-center mb-4">

                <img src="../../src/assets/Difficulty.svg" alt="" className='mx-1' />
                <span className="text-[#AAAAAA] text-sm">  Medium |</span>
                <img src="../../src/assets/Quiz3.svg" alt="" className='mx-1' />
                <span className="text-[#AAAAAA] text-sm">  15 Quizes |</span>
                <img src="../../src/assets/Clock.svg" alt="" className='mx-1' />
                <span className="text-[#AAAAAA] text-sm">  30 mins left  </span>
            </div>
            <div className="flex flex-row border  bg-[#f3f5f9] border-[#cdcef3] relative text-[16px]  p-4 rounded-[8px] mb-6 min-h-[87px] max-w-[1068px] items-center text-[#333333] ">
                <img src="../../src/assets/Quiz1.svg" alt="hands" className='mr-[24px]' />
                <p>This quiz configuration will be applied to all modules and quizzes you take for the course.
                    You can change config for a specific quiz before starting the quiz.</p>
                <img src="../../src/assets/Close.svg" alt="close" className='absolute top-[8px] right-[8px]' />
            </div>
            <div className="flex flex-row">
                <QuizDropDown options={options} onSelect={(val) => { setQuizType(val) }} width={'477px'} desc={'Select Quiz Type (can select more than one)'} />
                <div className="text-[16px] text-[#aaaaaa] w-[477px] h-[48px] rounded-xl border border-[#aaaaaa] px-3 py-4 flex items-center">
                    <input type="text" name="" id="" placeholder="Enter required number of questions" className="focus:outline-0 w-full" ref={numberOfQuestionsRef} />

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
            <h2 className='text-[#333333] font-bold text-xl mt-8'>Quiz Intructions:</h2>
            <ul className='list-disc mt-2'>
                <li className='mb-[11px]'>Read each question carefully before selecting or writing your answer.</li>
                <li className='mb-[11px]'>Multiple-choice questions have four options; select the most appropriate answer.</li>
                <li className='mb-[11px]'>True/False questions require you to choose between "True" or "False" based on your understanding.</li>
                <li className='mb-[11px]'>Maintain proper time management to ensure you complete all questions within the given time.</li>
                <li className='mb-[11px]'>If unsure about an answer, make an educated guess rather than leaving it blank.</li>
                <li className='mb-[11px]'>Stay focused, and avoid external help to test your knowledge honestly.</li>
                <li className='mb-[11px]'>After completing the quiz, review your answers before submission.</li>
                <li className='mb-[11px]'>Enjoy the learning process and use the quiz as a tool for self-improvement!</li>
            </ul>
            <button onClick={() => takeQuizHandler()} className="bg-[#040BC5] text-white py-2 px-[12px] rounded-[8px]">
        Start Quiz
      </button>
        </div>
    );
};

export default ModuleDetailsNewStart;