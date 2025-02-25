import React from "react";
import SideBar from "../components/SideBar";
import Topbar from "../components/TopBar";
import { useState } from "react";

import { Upload } from "lucide-react";
import GoalCard from "../components/GoalCard";
import TimelineCard from "../components/TimelineCard";
import QuizDropDown from "../components/QuizDropDown";
const AddNewCoursePage: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [isTimed, setIsTimed] = useState(false);
  

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];


  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="max-h-screen max-w-screen w-screen h-screen bg-white">
      <div className="flex flex-row  transition-all duration-300 ease-in-out">
        {/* Navigation Drawer */}
        <div
          className={`
             bg-[#F3F5F9] px-[24px] py-[2px] border-r border-[#ABAEEC] shadow-lg transition-all duration-300 ease-in-out
            ${isOpen ? 'w-[308px]' : 'w-[0] hidden'}
          `}
        >
          {/* Sidebar Content */}
          {isOpen && (
            <SideBar toggleDrawer={toggleDrawer} />
          )}
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${isOpen ? 'ml-[0px] p-6' : 'ml-0 p-12 pt-6'
            }`}
        >
          {/* Menu Icon (Appears when Sidebar is Closed) */}
          <img
            src="../../src/assets/menu.svg"
            alt="Menu Toggle"
            onClick={toggleDrawer}
            className={`cursor-pointer z-50 fixed top-[27px] left-[12px] ${isOpen ? 'hidden' : 'block'
              }`}
          />

          <Topbar />

          <div className="h-max-[283px] ">
            <div>

              <input type="text" placeholder="Enter Course Title..." className=" mb-3 focus:outline-0 w-full font-semibold text-[#AAAAAA] text-[32px]" />
              <div className="flex flex-row items-center">
                <textarea name="afdaf" id="" placeholder="Add course description" className=" focus:outline-0 h-[221px] w-full border-1 border-[#cdcef3] rounded-3xl p-5"></textarea>
                <div className="h-[221px] w-[235px] ml-5 bg-[#f3f5f9] rounded-2xl flex flex-col items-center justify-center">
                  <img src="../../src/assets/upload_img.svg" alt="" className="mb-2" />
                  <p className="text-[16px] text-[#333333] font-semibold w-[187px] text-center">Upload or select image for course</p>
                </div>

              </div>
            </div>
          </div>
          <div className="flex flex-row mt-8">
            <div>
              <h2 className="text-2xl font-semibold text-[#333333] mb-6">Select Course goal:</h2>
              <div className="flex flex-row ">

                <GoalCard img="../../src/assets/Personal Development.svg" title="Personal Development" />
                <GoalCard img="../../src/assets/Career Growth.svg" title="Career Growth" />
                <GoalCard img="../../src/assets/leaner.svg" title="Exam preparation" />
                <GoalCard img="../../src/assets/Others.svg" title="Others" />
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-semibold text-[#333333] mb-6">Select Timeline:</h2>
              <div className="flex flex-row">
                <TimelineCard title="7 days" />
                <TimelineCard title="2 weeks" />
                <TimelineCard title="4 weeks" />
                <TimelineCard title="Custom" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-[#333333] mt-8">Course Materials</h2>
          <button className="bg-[#040BC5]  text-white px-6 py-[12px] rounded-[8px] mt-6 mb-8 ">Upload Materials</button>
          <h2 className="text-2xl font-semibold text-[#333333] mb-6">Quiz Configuration</h2>
          <div className="flex flex-row border  bg-[#f3f5f9] border-[#cdcef3] relative text-[16px]  p-4 rounded-[8px] mb-6 min-h-[87px] max-w-[1068px] items-center text-[#333333] ">
            <img src="../../src/assets/Quiz1.svg" alt="hands" className='mr-[24px]' />
            <p>This quiz configuration will be applied to all modules and quizzes you take for the course. 
              You can change config for a specific quiz before starting the quiz.</p>
            <img src="../../src/assets/Close.svg" alt="close" className='absolute top-[8px] right-[8px]' />
          </div>
          <div className="flex flex-row">
           <QuizDropDown options={options} onSelect={(val) => {console.log(val)} } />
            <div className="text-[16px] text-[#aaaaaa] w-[477px] h-[48px] rounded-xl border border-[#aaaaaa] px-3 py-4 flex items-center">
            <input type="text" name="" id="" placeholder="Enter required number of questions"  className="focus:outline-0 w-full"/>

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
    </div>
    <button className="bg-[#040BC5] mt-[40px]   text-white p-[12px] rounded-[8px] w-[248px] ">Upload Course</button>

        </div>
      </div>

    </div>
  );
};

export default AddNewCoursePage;
