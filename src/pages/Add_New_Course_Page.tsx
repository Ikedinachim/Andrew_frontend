// Add_New_Course_Page.tsx
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import QuizDropDown from '../components/QuizDropDown';
import GoalCard from '../components/GoalCard';
import TimelineCard from '../components/TimelineCard';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CourseMaterialTag from '../components/CourseMaterialTag';
import LoadingPage from './LoadingPage';
import ToggleSwitch from '../components/ToggleSwitch';
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
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const daysRef = useRef()
  const numberOfQuestionsRef = useRef()
  const descriptionRef = useRef()
  const titleRef = useRef()
  const fileTitleRef = useRef()
  const fileDescriptionRef = useRef()
  const UrlLinkRef = useRef()
  const { user } = useSelector((state) => state.user);
  const { courses, status, uploadStatus, error } = useSelector((state) => state.course);
  const [hours, setHours] = useState('00');
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
    { label: 'URL', value: 'URL' },
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
    if(mediaOption === 'URL'){
      setFiles([...files, { title: fileTitleRef.current.value, description: fileDescriptionRef.current.value, UrlLink: UrlLinkRef.current.value, fileType: mediaOption }])
    
    }else{

      setFiles([...files, { title: fileTitleRef.current.value, description: fileDescriptionRef.current.value, file: selectedFile, fileType: mediaOption }])
    }
  
    setIsPopupOpen(false);
  }

  const deleteMaterial = (title, description) => {
    const newFiles = files.filter(file => file.title !== title && file.description !== description)
    setFiles(newFiles)
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
    event.preventDefault()
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
    setUploading(true);
  
    const formData = new FormData();
    formData.append('title', titleRef.current.value);
    formData.append('description', descriptionRef.current.value);
    formData.append('timeline', '3');
    formData.append('goal', selectedGoal);
    formData.append(
      'quizConfig',
      JSON.stringify({
        quizTypes: [quizType],
        numberOfQuestions: +numberOfQuestionsRef.current.value,
        difficultyLevel: difficulty,
        isTimed: isTimed,
        timeDuration: (parseInt(hours) * 60) + parseInt(minutes),
      })
    );
  
    const linkMaterials = files
      .filter(file => file.fileType === 'URL')
      .map(file => ({
        title: file.title,
        description: file.description,
        type: 'link',
        fileUrl: file.UrlLink,
      }));
  
    if (linkMaterials.length > 0) {
      formData.append('materials', JSON.stringify(linkMaterials));
    }
  
    files
      .filter(file => file.fileType !== 'URL')
      .forEach(file => {
        const fileObj = file.file;
        formData.append('materials', fileObj);
        formData.append(`materialTitle_${fileObj.name}`, file.title);
        formData.append(`materialDescription_${fileObj.name}`, file.description);
      });
  
    try {
      setLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/courses/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      console.log('Success:', response.data);
    } catch (e) {
      alert(`Error Creating Course`);
      console.log(`Upload error:, ${error } ${e}`);
    } finally { 
      setUploading(false);
      setLoading(false)
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
    <div className="w-[445px] rounded-[16px] shadow-md flex flex-col p-8 relative bg-white">
      {/* <img
        src="../../public/assets/Close.svg"
        alt=""
        className="absolute top-5 right-4 cursor-pointer"
        onClick={() => setIsPopupOpen(false)}
      /> */}
      <h2 className="text-lg text-[#333333] font-semibold mb-6">Upload Materials</h2>
      <QuizDropDown
        options={mediaOptions}
        onSelect={setMediaOption}
        selectedVal ={ mediaOption}
        width='381px'
        desc='Select Material Type'
      />
      <div className="text-sm mt-4 mb-4 text-[#333] w-[381px] h-[48px] rounded-lg border border-[#aaaaaa] px-3 py-4 flex items-center">
        <input
          type="text"
          placeholder="Enter Title for file"
          className="focus:outline-0  w-full bg-transparent"
          ref={fileTitleRef}
          
        />
      </div>
      <div className="text-sm mb-[20px] text-[#333] w-[381px] h-[99px] rounded-lg border border-[#aaaaaa] px-3 py-4 flex items-center">
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
          style={{ display: 'none', cursor:'pointer'}}
        />
      { mediaOption === 'URL' ? 
      <div className="text-sm mb-4 text-[#333] w-[381px] h-[48px] rounded-lg border border-[#aaaaaa] px-3 py-4 flex items-center">
      <input
        type="text"
        placeholder="Enter link here"
        className="focus:outline-0 w-full bg-transparent"
        ref={UrlLinkRef}
      />
    </div> : <button
          className="text-[12px] mb-[32px] text-[#aaaaaa] w-[381px] h-[125px] rounded-xl border border-dashed border-[#aaaaaa] px-3 py-4 flex flex-col items-center justify-center"
          onClick={handleButtonClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >        <img src="../../public/assets/Upload.svg" alt="" />
          <p className="w-[146px]">
            {selectedFile
              ? `Selected: ${selectedFile.name}`
              : 'Drag and drop the file or browse file from device Max size: 15MB'}
          </p>      </button>}
      </>
      <div className="flex flex-row justify-between items-center mt-2">
        <button
          className="bg-white text-[#FEC260] px-6 py-[12px] border border-[#FEC260] rounded-lg hover:shadow-lg hover:font-bold cursor-pointer"
          onClick={() => setIsPopupOpen(false)}
        >
          Cancel
        </button>
        <button onClick={() => uploadMaterial()} className="bg-[#040BC5] text-white px-6 py-[12px] border-2 border-white rounded-lg cursor-pointer hover:shadow-lg hover:border-2 hover:border-[#040BC5] hover:bg-[#F3F5F9] hover:text-[#040BC5] hover:font-bold">
          Upload
        </button>
      </div>
    </div>
  );

  const CustomDayDialog = () => (
    <div className="w-[445px] rounded-2xl shadow-md flex flex-col p-6 relative bg-white">
      {/* <img
        src="../../public/assets/Close.svg"
        alt="Close"
        className="absolute top-5 right-4 cursor-pointer"
        onClick={() => setIsPopupOpen(false)}
      /> */}
      <h2 className="text-lg text-[#333333] font-semibold">Select Custom Days</h2>

      {/* New section for custom duration */}
      <div className="flex flex-row items-center space-x-2 mt-6 mb-8 justify-center">
        <input
          type="number"
          placeholder="00"
          min="1"
          ref={daysRef}
          className="h-[50px] w-[70px] px-2 py-1 text-lg focus:outline-none rounded-xl border border-[#aaaaaa] text-center"
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
          className="bg-white text-[#FEC260] px-6 py-[12px] border border-[#FEC260] rounded-lg cursor-pointer hover:shadow-lg hover:font-bold"
          onClick={() => setIsCustomDayPopupOpen(false)}
        >
          Cancel
        </button>
        <button className="bg-[#040BC5] text-white px-6 py-[8px] border-2 border-white rounded-lg cursor-pointer hover:shadow-lg hover:border-2 hover:border-[#040BC5] hover:bg-[#F3F5F9] hover:text-[#040BC5] hover:font-bold" onClick={() => selectCustomDaysHandler()}>
          OK
        </button>
      </div>
    </div>
  );

  if (uploading){
    return <LoadingPage content = 'Uploading Course' />
  }

return (
  <div>
    {/* Your main page content */}
    <div>
      <div className="h-max-[283px]">
        <div>
          <input type="text" ref={titleRef} placeholder="Enter Course Title..." className=" mt-4 mb-6 focus:outline-0 w-full font-medium text-[#AAAAAA] text-3xl" />
          <div className="flex flex-row w-full">
            <textarea name="afdaf" ref={descriptionRef} id="" placeholder="Add course description..." className=" focus:outline-0 h-auto w-[85%] border-1 border-[#cdcef3] rounded-2xl p-5"></textarea>
            {/* <div className="h-[200px] w-[15%] ml-5 bg-[#f3f5f9] rounded-2xl flex flex-col items-center justify-center p-8 cursor-pointer">
              <img src="../../public/assets/upload_img.svg" alt="" className="mb-2" />
              <p className="text-sm text-[#333333] font-semibold text-center">Upload or select image for course</p>
            </div> */}
            <img src='../../public/assets/Programming3.svg' className='ml-4'/>
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-8 justify-between">
        <div>
          <h2 className="text-xl font-medium text-[#333333] mb-6">Select Course goal:</h2>
          <div className="flex flex-row gap-auto">
            <GoalCard img="../../public/assets/Personal Development.svg" title="Personal Development" onClick={handleGoalSelect} />
            <GoalCard img="../../public/assets/Career Growth.svg" title="Career Growth" onClick={handleGoalSelect} />
            <GoalCard img="../../public/assets/leaner.svg" title="Exam preparation" onClick={handleGoalSelect} />
            <GoalCard img="../../public/assets/Others.svg" title="Others" onClick={handleGoalSelect} />
          </div>
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-medium text-[#333333] mb-6">Select Timeline:</h2>
          <div className="flex flex-row justify-between">
            <TimelineCard title="7 days" onClick={handleTimelineSelect} />
            <TimelineCard title="2 weeks" onClick={handleTimelineSelect} />
            <TimelineCard title="4 weeks" onClick={handleTimelineSelect} />
            <TimelineCard title="Custom" onClick={handleTimelineSelect} />
          </div>
        </div>
      </div>
      <hr className="w-full border-t-3 border-[#F3F5F9] mb-2 mt-10" />

      <h2 className="text-xl font-medium text-[#333333] mt-8 mb-2">Upload Course Materials</h2>
      {/* Upload Materials */}
      {files.map((file) => (
        <CourseMaterialTag title={file.title} description={file.description} fileType={file.fileType} deleteMaterial = {deleteMaterial} />
      ))}
      <button onClick={() => setIsPopupOpen(true)} className="bg-[#040BC5] shadow-md text-white px-6 py-[12px] rounded-md mt-6 hover:bg-[#ABAEEC] hover:border-[#585CD8] hover:shadow-lg hover:text-[#333333] transition-all duration-300 cursor-pointer">Upload Materials</button>

      <hr className="w-full border-t-3 border-[#F3F5F9] mb-2 mt-10" />

      {/* Quiz Config */}
      <h2 className="text-xl font-medium text-[#333333] mt-8">Quiz Configuration</h2>
      <div className="flex flex-row border bg-[#f3f5f9] border-[#cdcef3] relative text-sm p-3 rounded-md my-4 max-w-full items-center text-[#333333] ">
        <img src="../../public/assets/Quiz1.svg" alt="hands" className='mr-[12px]' />
        <p>This quiz configuration will be applied to all modules and quizzes you take for the course.
          You can change config for a specific quiz before starting the quiz.</p>
        {/* <img src="../../public/assets/Close.svg" alt="close" className='absolute top-[8px] right-[8px]' /> */}
      </div>

      {/* Quiz Config Dropdown */}
      <div className="flex flex-row">
        <QuizDropDown options={options} onSelect={setQuizType} selectedVal={quizType} width={'477px'} desc={'Select Quiz Type (can select more than one)'} />

        {/* Number of Questions */}
        <div className="text-sm text-[#333] w-[300px] h-[48px] rounded-lg border border-[#AAAAAA] px-3 py-4 flex items-center">
          <input type="number" min="5" name="" id="" placeholder="Enter required number of questions" className="focus:outline-0 w-full" ref={numberOfQuestionsRef} />
        </div>
      </div>

      {/* Difficulty and Timing Settings */}
      <div className="flex flex-wrap gap-16 w-full mt-5 items-start">
        {/* Select Difficulty Level */}
        <div className="min-w-[200px]">
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
                <span className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${difficulty === level ? 'border-[#040BC5]' : 'border-[#AAAAAA]'}`}>
                  {difficulty === level && <span className="w-2 h-2 bg-[#040BC5] rounded-full"></span>}
                </span>
                {level}
              </label>
            ))}
          </div>
        </div>

        {/* Timing selection */}
        <div className="min-w-[200px]">
          <h3 className="text-base font-semibold mb-2">Timing:</h3>
          <div className="flex items-center gap-3 pt-1">
            <span className="text-sm font-medium">Not Timed</span>
            <div
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-200 ${isTimed ? 'justify-end bg-[#040BC5]' : 'justify-start bg-[#AAAAAA]'}`}
              onClick={() => setIsTimed(!isTimed)}
            >
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-sm font-medium">Timed</span>
          </div>
        </div>

        {/* Enter duration */}
        <div className="min-w-[200px]">
          <label className="text-base font-semibold block mb-2">Duration:</label>
          <div className="flex gap-2 items-center">
            {/* Hours */}
            <select
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="border text-sm border-[#AAAAAA] focus:outline-none focus:ring-1 focus:ring-[#040BC5] rounded px-2 py-1 text-[#333333]"
            >
              {hourOptions.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>

            <span className="text-lg font-semibold">:</span>

            {/* Minutes */}
            <select
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="border text-sm border-[#F3F5F9] bg-[#F3F5F9] focus:outline-none focus:ring-1 focus:ring-[#040BC5] rounded px-2 py-1 text-[#333333]"
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


      {/* Save Course */}
      <button onClick={async ()  => await handleUpload()} className="bg-[#040BC5] mt-[40px] text-white p-[12px] rounded-[8px] w-[248px]
      shadow-md hover:bg-[#ABAEEC] hover:border-[#585CD8] hover:shadow-lg hover:text-[#333333] transition-all duration-300 cursor-pointer ">Upload Course</button>

      {/* <button 
        onClick={() => setIsPopupOpen(true)}
        className="bg-[#040BC5] text-white px-6 py-[12px] rounded-[8px]"
      >
        Upload Material
      </button> */}

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <MaterialUploadForm   />
      </Popup>
      <Popup isOpen={isCustomDayPopupOpen} onClose={() => setIsCustomDayPopupOpen(false)}>
        <CustomDayDialog />
      </Popup>
    </div>
  </div>
);
};

export default Add_New_Course_Page;
