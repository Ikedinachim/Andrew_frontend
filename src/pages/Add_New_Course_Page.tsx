// Add_New_Course_Page.tsx
import { ChangeEvent, useRef, useState } from 'react';
import QuizDropDown from '../components/QuizDropDown';
import GoalCard from '../components/GoalCard';
import TimelineCard from '../components/TimelineCard';
import { useSelector } from 'react-redux';
import axios from 'axios';
// Assuming this is the correct import path

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface Option {
  label: string;
  value: string;
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
  const [isCustomDayPopupOpen, setIsCustomDayPopupOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [isTimed, setIsTimed] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState('')
  const [selectedTimeline, setSelectedTimeline] = useState('')
  const [duration, setDuration] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errormessage, setErrorMessage] = useState('')
  const [quizType, setQuizType] = useState('')
  const [mediaOption, setMediaOption] = useState('')
  const [fileTitle, setFileTitle] = useState('')
  const [fileDescription, setFileDescription] = useState('')
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const daysRef = useRef()
  const numberOfQuestionsRef = useRef()
  const descriptionRef = useRef()
  const titleRef = useRef()
  const fileTitleRef = useRef()
  const fileDescriptionRef = useRef()
  const { user, status, error } = useSelector((state) => state.user);
  const [hours, setHours] = useState('10');
  const [minutes, setMinutes] = useState('00');

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
  const options = [
    { label: 'True/False', value: 'True/False' },
    { label: 'MCQ', value: 'MCQ' },
    { label: 'Open-ended', value: 'Open-ended' },
    { label: 'Coding Exercises', value: 'Coding Exercises' },
  ];
  const mediaOptions = [
    { label: 'PDF', value: 'PDF' },
    { label: 'Doc', value: 'DOC' },
    { label: 'Audio', value: 'Audio' },
  ];
  // Options for duration unit selection
  const durationOptions: Option[] = [
    { label: 'Days', value: 'days' },
    { label: 'Weeks', value: 'weeks' },
  ];


  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const uploadMaterial = () => {
    setFileTitle(fileTitleRef.current.value)
    setFileDescription(fileDescriptionRef.current.value)
    setIsPopupOpen(false);
  }
  // const uploadMaterial = () => {
  //   // http request for email verification
  //   let title = titleRef.current.value;
  //   let description = descriptionRef.current.value;
  //   axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/request-email-verification`, { email })
  //     .then(response => {
  //       console.log(response.data);
  //       navigate('/otp-verification', { 
  //         state: { email: email }
  //       });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setErrorMessage(error.response.data.message)
  //     });
  //   };

  const handleGoalSelect = (goal: string) => {
    console.log(goal)
    setSelectedGoal(goal)
  }
  const handleTimelineSelect = (timeline: string) => {
    console.log(timeline)
    setSelectedTimeline(timeline)
    if (timeline === 'Custom') {
      setIsCustomDayPopupOpen(true)
    }
  }


  const selectCustomDaysHandler = () => {
    console.log(daysRef.current?.value)
    console.log(duration)
    console.log(user)
    setIsCustomDayPopupOpen(false)
  }
  // Handle file selection
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Handle button click
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }
    const datat = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      timeline:  3,
      goal: selectedGoal,
      quizConfig: JSON.stringify({
        quizTypes: [quizType],
        numberOfQuestions: +numberOfQuestionsRef.current.value,
        difficultyLevel: difficulty,
        isTimed: isTimed,
        timeDuration: +((parseInt(hours, 10) * 60) + parseFloat(minutes,10)),

      }),
      materials: selectedFile,
      [`materialTitle_${selectedFile.name}`]: fileTitle,
      [`materialDescription_${selectedFile.name}`]: fileDescription
    }


  
  console.log(datat);


  setUploading(true);
  const formData = new FormData();
  formData.append('file', selectedFile);
  formData.append('title', titleRef.current.value);
  formData.append('description', descriptionRef.current.value);
  formData.append('type', mediaOption);
  formData.append('courseId', 'dfadsfdsa');
  try {
    console.log(user)
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/courses/`, datat, {
      headers: {
        
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      },
      onUploadProgress: (progressEvent) => {
        // You can handle upload progress here if needed
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        console.log(`Upload Progress: ${percentCompleted}%`);
      },
    });

    console.log('File uploaded successfully:', response.data);
    setSelectedFile(null);
    // Add success message or handle response as needed
  } catch (error) {
    console.error('Error uploading file:', error);
    // Handle error appropriately
  } finally {
    setUploading(false);
  }
};

// Handle drag and drop
const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
  e.preventDefault();
};

const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
  e.preventDefault();
  const file = e.dataTransfer.files?.[0];
  if (file) {
    setSelectedFile(file);
  }
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
      onSelect={(val) => { setMediaOption(val) }}
      width='381px'
      desc='Select Material Type'
    />
    <div className="text-[16px] mt-4 mb-4 text-[#aaaaaa] w-[381px] h-[48px] rounded-xl border border-[#aaaaaa] px-3 py-4 flex items-center">
      <input
        type="text"
        placeholder="Enter Title for file"
        className="focus:outline-0 w-full bg-transparent"
        ref={fileTitleRef}
      />
    </div>
    <div className="text-[16px] mb-[20px] text-[#aaaaaa] w-[381px] h-[99px] rounded-xl border border-[#aaaaaa] px-3 py-4 flex items-center">
      <input
        type="text"
        placeholder="Enter description"
        className="focus:outline-0 w-full bg-transparent"
        ref={fileDescriptionRef}
      />
    </div>
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".pdf,.doc,.docx,.mp3,.mp4,.wav,.avi"
        style={{ display: 'none' }}
      />
      <button
        className="text-[12px] mb-[32px] text-[#aaaaaa] w-[381px] h-[125px] rounded-xl border border-dashed border-[#aaaaaa] px-3 py-4 flex flex-col items-center justify-center"
        onClick={handleButtonClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >        <img src="../../src/assets/Upload.svg" alt="" />
        <p className="w-[146px]">
          {selectedFile
            ? `Selected: ${selectedFile.name}`
            : 'Drag and drop the file or browse file from device'}
        </p>      </button>
    </>
    <div className="flex flex-row justify-between items-center">
      <button
        className="bg-white text-[#FEC260] px-6 py-[12px] border border-[#FEC260] rounded-[8px]"
        onClick={() => setIsPopupOpen(false)}
      >
        Cancel
      </button>
      <button onClick={() => uploadMaterial()} className="bg-[#040BC5] text-white px-6 py-[12px] rounded-[8px]">
        Upload
      </button>
    </div>
  </div>
);

const CustomDayDialog = () => (
  <div className="w-[445px]  rounded-[16px] shadow-md flex flex-col p-8 relative bg-white">
    <img
      src="../../src/assets/Close.svg"
      alt="Close"
      className="absolute top-5 right-4 cursor-pointer"
      onClick={() => setIsPopupOpen(false)}
    />
    <h2 className="text-[24px] text-[#333333] font-semibold mb-8">Select Custom Days</h2>


    {/* New section for custom duration */}
    <div className="flex flex-row items-center space-x-2 mt-4 mb-4 justify-center">
      <input
        type="number"
        placeholder="Duration"
        ref={daysRef}
        className="h-[50px] w-[100px] px-2 py-1 text-[16px] focus:outline-none rounded-xl border border-[#aaaaaa]"
      />
      <QuizDropDown
        options={durationOptions}
        onSelect={(val: Option) => setDuration(val)}
        width="120px"
        desc="Select Unit"
      />
    </div>

    <div className="flex flex-row justify-between items-center">
      <button
        className="bg-white text-[#FEC260] px-6 py-[12px] border border-[#FEC260] rounded-[8px]"
        onClick={() => setIsCustomDayPopupOpen(false)}
      >
        Cancel
      </button>
      <button className="bg-[#040BC5] text-white px-6 py-[12px] rounded-[8px]" onClick={() => selectCustomDaysHandler()}>
        OK
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

          <input type="text" ref={titleRef} placeholder="Enter Course Title..." className=" mb-3 focus:outline-0 w-full font-semibold text-[#AAAAAA] text-[32px]" />
          <div className="flex flex-row items-center">
            <textarea name="afdaf" ref={descriptionRef} id="" placeholder="Add course description" className=" focus:outline-0 h-[221px] w-full border-1 border-[#cdcef3] rounded-3xl p-5"></textarea>
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

            <GoalCard img="../../src/assets/Personal Development.svg" title="Personal Development" onClick={handleGoalSelect} />
            <GoalCard img="../../src/assets/Career Growth.svg" title="Career Growth" onClick={handleGoalSelect} />
            <GoalCard img="../../src/assets/leaner.svg" title="Exam preparation" onClick={handleGoalSelect} />
            <GoalCard img="../../src/assets/Others.svg" title="Others" onClick={handleGoalSelect} />
          </div>
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-semibold text-[#333333] mb-6">Select Timeline:</h2>
          <div className="flex flex-row">
            <TimelineCard title="7 days" onClick={handleTimelineSelect} />
            <TimelineCard title="2 weeks" onClick={handleTimelineSelect} />
            <TimelineCard title="4 weeks" onClick={handleTimelineSelect} />
            <TimelineCard title="Custom" onClick={handleTimelineSelect} />
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-[#333333] mt-8">Course Materials</h2>
      <div className='h-[80px] w-[834px] bg-white shadow-md p-5 relative flex flex-row items-center justify-between '>
        <div className='flex flex-row'>

          <img src="../../src/assets/PDF.svg" alt="" />
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
      <button onClick={async ()  => await handleUpload()} className="bg-[#040BC5] mt-[40px]   text-white p-[12px] rounded-[8px] w-[248px] ">Upload Course</button>

      {/* <button 
        onClick={() => setIsPopupOpen(true)}
        className="bg-[#040BC5] text-white px-6 py-[12px] rounded-[8px]"
      >
        Upload Material
      </button> */}

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <MaterialUploadForm />
      </Popup>
      <Popup isOpen={isCustomDayPopupOpen} onClose={() => setIsCustomDayPopupOpen(false)}>
        <CustomDayDialog />
      </Popup>
    </div>
  </div>
);
};

export default Add_New_Course_Page;
