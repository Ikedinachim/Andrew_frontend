// Add_New_Course_Page.tsx
import { useState } from 'react';
import QuizDropDown from '../components/QuizDropDown';
import GoalCard from '../components/GoalCard';
import TimelineCard from '../components/TimelineCard';
 // Assuming this is the correct import path

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="fixed inset-0 backdrop-blur-sm bg-black/30"
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        {children}
      </div>
    </div>
  );
};

const Add_New_Course_Page = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [isTimed, setIsTimed] = useState(false);


  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];
  const mediaOptions = [
    { label: 'PDF', value: 'PDF' },
    { label: 'Doc', value: 'DOC' },
    { label: 'Audio', value: 'Audio' },
  ];


  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };


  const MaterialUploadForm = () => (
    <div className="w-[445px] h-[570px] rounded-[16px] shadow-md flex flex-col p-8 relative bg-white">
      <img 
        src="../../src/assets/Close.svg" 
        alt="" 
        className="absolute top-5 right-4 cursor-pointer" 
        onClick={() => setIsPopupOpen(false)}
      />
      <h2 className="text-[24px] text-[#333333] font-semibold mb-8">Upload Materials</h2>
      <QuizDropDown 
        options={mediaOptions} 
        onSelect={(val) => { console.log(val) }} 
        width='381px' 
        desc='Select Material Type'
      />
      <div className="text-[16px] mt-4 mb-4 text-[#aaaaaa] w-[381px] h-[48px] rounded-xl border border-[#aaaaaa] px-3 py-4 flex items-center">
        <input 
          type="text" 
          placeholder="Enter Title for file" 
          className="focus:outline-0 w-full bg-transparent" 
        />
      </div>
      <div className="text-[16px] mb-[20px] text-[#aaaaaa] w-[381px] h-[99px] rounded-xl border border-[#aaaaaa] px-3 py-4 flex items-center">
        <input 
          type="text" 
          placeholder="Enter description" 
          className="focus:outline-0 w-full bg-transparent" 
        />
      </div>
      <button className="text-[12px] mb-[32px] text-[#aaaaaa] w-[381px] h-[125px] rounded-xl border border-dashed border-[#aaaaaa] px-3 py-4 flex flex-col items-center justify-center">
        <img src="../../src/assets/Upload.svg" alt="" />
        <p className="w-[146px]">Drag and drop the file or browse file from device</p>
      </button>
      <div className="flex flex-row justify-between items-center">
        <button 
          className="bg-white text-[#FEC260] px-6 py-[12px] border border-[#FEC260] rounded-[8px]"
          onClick={() => setIsPopupOpen(false)}
        >
          Cancel
        </button>
        <button className="bg-[#040BC5] text-white px-6 py-[12px] rounded-[8px]">
          Upload
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* Your main page content */}
      <div>
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
      <div className='h-[80px] w-[834px] bg-white shadow-md p-5 relative flex flex-row items-center justify-between '>
        <div className='flex flex-row'>

        <img  src="../../src/assets/PDF.svg" alt="" />
        <div className='h-[40px] flex flex-col justify-start items-start ml-[23px]'>
          <h2 className='text-xl font-semibold text-[#333333]'>Title</h2>
          <p className='text-[14px] font-[400px] text-[#333333] '>Description of the uploaded file max 2 lines</p>
        </div>
        </div>
        <div className='flex flex-row'>
          <p className=' text-[#333333] font-semibold text-[16px]'>Type:PDF</p>
          <div className='ml-[51px] flex flex-col h-10 items-center justify-between text-[10px] font-normal '>
            <img src="../../src/assets/Replace.svg" alt="" />
            <p>Replace file</p>
          </div>
        </div>
        <img className='absolute right-[-10px] top-[-10px]' src="../../src/assets/CloseCircle.svg" alt="" />
      </div>



      <button onClick={() => setIsPopupOpen(true)} className="bg-[#040BC5]  text-white px-6 py-[12px] rounded-[8px] mt-6 mb-8 ">Upload Materials</button>
      <h2 className="text-2xl font-semibold text-[#333333] mb-6">Quiz Configuration</h2>
      <div className="flex flex-row border  bg-[#f3f5f9] border-[#cdcef3] relative text-[16px]  p-4 rounded-[8px] mb-6 min-h-[87px] max-w-[1068px] items-center text-[#333333] ">
        <img src="../../src/assets/Quiz1.svg" alt="hands" className='mr-[24px]' />
        <p>This quiz configuration will be applied to all modules and quizzes you take for the course.
          You can change config for a specific quiz before starting the quiz.</p>
        <img src="../../src/assets/Close.svg" alt="close" className='absolute top-[8px] right-[8px]' />
      </div>
      <div className="flex flex-row">
        <QuizDropDown options={options} onSelect={(val) => { console.log(val) }} width = {'477px'} desc={'Select Quiz Type (can select more than one)'}/>
        <div className="text-[16px] text-[#aaaaaa] w-[477px] h-[48px] rounded-xl border border-[#aaaaaa] px-3 py-4 flex items-center">
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
      </div>
      <button className="bg-[#040BC5] mt-[40px]   text-white p-[12px] rounded-[8px] w-[248px] ">Upload Course</button>
   
      {/* <button 
        onClick={() => setIsPopupOpen(true)}
        className="bg-[#040BC5] text-white px-6 py-[12px] rounded-[8px]"
      >
        Upload Material
      </button> */}

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <MaterialUploadForm />
      </Popup>
    </div>
    </div>
  );
};

export default Add_New_Course_Page;
