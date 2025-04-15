// EditNewCoursePage.tsx
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import QuizDropDown from '../components/QuizDropDown';
import GoalCard from '../components/GoalCard';
import TimelineCard from '../components/TimelineCard';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import CourseMaterialTag from '../components/CourseMaterialTag';
import LoadingPage from './LoadingPage';
import Swal from 'sweetalert2';
import { deleteCourseMaterial, uploadCourseMaterial } from '../features/materialSlice';
import { getSingleCourse } from '../features/courseDetailSlice';
import { Form } from 'react-router-dom';
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

const EditNewCoursePage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { course, status, error } = useSelector((state) => state.courseDetail);
  const { materialData, materialStatus, materialError } = useSelector((state) => state.material);
  const [isCustomDayPopupOpen, setIsCustomDayPopupOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [difficulty, setDifficulty] = useState(course.data.quizConfig.difficultyLevel);
  const [isTimed, setIsTimed] = useState(course.data.quizConfig.isTimed);
  const [selectedGoal, setSelectedGoal] = useState('')
  const [selectedTimeline, setSelectedTimeline] = useState('')
  const [duration, setDuration] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errormessage, setErrorMessage] = useState('')
  const [quizType, setQuizType] = useState(course.data.quizConfig.quizTypes[0])
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
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user);
  const [hours, setHours] = useState(course.data.quizConfig.timeDuration / 60);
  const [minutes, setMinutes] = useState(course.data.quizConfig.timeDuration % 60);

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
    { label: 'link', value: 'link' },
  ];
  // Options for duration unit selection
  const durationOptions: Option[] = [
    { label: 'Days', value: 'days' },
    { label: 'Weeks', value: 'weeks' },
  ];


  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  

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

  const deleteCourseMaterialFromDB = (materialId, courseId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Deleting Material Will Affect Modules!",
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
        console.log(materialData);

        dispatch(deleteCourseMaterial({ courseId: courseId, materialId: materialId }));
        dispatch(getSingleCourse(course.data._id));
        console.log(materialStatus);

        if (materialStatus == 'success') {
          Swal.fire(
            'Deleted!',
            'Your Material has been deleted.',
            'success'
          );

        } else {
          Swal.fire(
            'Error!',
            `There was an error deleting your Material. ${materialError}`,
            'error'
          );

        }
      }
    });
  }

  const uploadMaterialHandler = () => {
    // for materials
    const materialFormData = new FormData();
    if (mediaOption === 'link') {
      materialFormData.append('fileUrl', UrlLinkRef.current.value);
    }else{
      materialFormData.append('file', selectedFile);
    }
    materialFormData.append('title', fileTitleRef.current.value);
    materialFormData.append('description', fileDescriptionRef.current.value);
    materialFormData.append('type', mediaOption);
    materialFormData.append('courseId', course.data._id);


    Swal.fire({
      title: 'Are you sure?',
      text: "Uploading New Material Will Affect Modules!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#D42953',
      cancelButtonColor: '#666666',
      confirmButtonText: 'Yes, upload it!',
      background: '#ffffff',
      backdrop: `rgba(0,0,0,0.4)`,
      customClass: {
        container: 'blur-background'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(materialData);

        dispatch(uploadCourseMaterial(materialFormData));
        dispatch(getSingleCourse(course.data._id));
        console.log(materialStatus);

        if (materialStatus == 'success') {
          Swal.fire(
            'Uploaded!',
            'Your Material has been uploaded.',
            'success'
          );
        
      
          setIsPopupOpen(false);
        } else {
          Swal.fire(
            'Error!',
            `There was an error uploading your Material. ${materialError}`,
            'error'
          );

        }
      }
    });



  }

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
    



    // const linkMaterials = files
    //   .filter(file => file.fileType === 'URL')
    //   .map(file => ({
    //     title: file.title,
    //     description: file.description,
    //     type: 'link',
    //     fileUrl: file.UrlLink,
    //   }));

    // if (linkMaterials.length > 0) {
    //   formData.append('materials', JSON.stringify(linkMaterials));
    // }

    // files
    //   .filter(file => file.fileType !== 'URL')
    //   .forEach(file => {
    //     const fileObj = file.file;
    //     console.log(fileObj);
        
    //     formData.append('materials', fileObj);
    //     formData.append(`materialTitle_${fileObj.name}`, file.title);
    //     formData.append(`materialDescription_${fileObj.name}`, file.description);
    //   });
  
    try {
      setLoading(true)
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/courses/${course.data._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(getSingleCourse(course.data._id));

      console.log('Success:', response.data);
    } catch (e) {
      alert(`Error Creating Course`);
      console.log(`Upload error:,  ${e}`);
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
      <img
        src="../../public/assets/Close.svg"
        alt=""
        className="absolute top-5 right-4 cursor-pointer"
        onClick={() => setIsPopupOpen(false)}
      />
      <h2 className="text-[24px] text-[#333333] font-semibold mb-8">Upload Materials</h2>
      <QuizDropDown
        options={mediaOptions}
        onSelect={setMediaOption}
        selectedVal={mediaOption}
        width='381px'
        desc='Select Material Type'
      />
      <div className="text-[16px] mt-4 mb-4 text-[#aaaaaa] w-[381px] h-[48px] rounded-xl border border-[#aaaaaa] px-3 py-4 flex items-center">
        <input
          type="text"
          placeholder="Enter Title for file"
          className="focus:outline-0  w-full bg-transparent"
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
        {mediaOption === 'URL' ?
          <div className="text-[16px] mt-4 mb-4 text-[#aaaaaa] w-[381px] h-[48px] rounded-xl border border-[#aaaaaa] px-3 py-4 flex items-center">
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
                : 'Drag and drop the file or browse file from device'}
            </p>      </button>}
      </>
      <div className="flex flex-row justify-between items-center">
        <button
          className="bg-white text-[#FEC260] px-6 py-[12px] border border-[#FEC260] rounded-[8px]"
          onClick={() => setIsPopupOpen(false)}
        >
          Cancel
        </button>
        <button onClick={() => uploadMaterialHandler()} className="bg-[#040BC5] text-white px-6 py-[12px] rounded-[8px]">
          Upload
        </button>
      </div>
    </div>
  );

  const CustomDayDialog = () => (
    <div className="w-[445px]  rounded-[16px] shadow-md flex flex-col p-8 relative bg-white">
      <img
        src="../../public/assets/Close.svg"
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
  if (uploading) {
    return <LoadingPage content='Uploading Course' />
  }
  if (status == 'loading') {
    return <LoadingPage content='Fetching Course Details!' />
  }
  return (
    <div>
      {/* Your main page content */}
      <div>
        <div className="h-max-[283px] ">
          <div>

            <input type="text" defaultValue={course.data.title} ref={titleRef} placeholder="Enter Course Title..." className=" mb-3 focus:outline-0 w-full font-semibold text-[#AAAAAA] text-[32px]" />
            <div className="flex flex-row items-center">
              <textarea name="afdaf" defaultValue={course.data.description} ref={descriptionRef} id="" placeholder="Add course description" className=" focus:outline-0 h-[221px] w-full border-1 border-[#cdcef3] rounded-3xl p-5"></textarea>
              <div className="h-[221px] w-[235px] ml-5 bg-[#f3f5f9] rounded-2xl flex flex-col items-center justify-center">
                <img src="../../public/assets/upload_img.svg" alt="" className="mb-2" />
                <p className="text-[16px] text-[#333333] font-semibold w-[187px] text-center">Upload or select image for course</p>
              </div>

            </div>
          </div>
        </div>
        <div className="flex flex-row mt-8">
          <div>
            <h2 className="text-2xl font-semibold text-[#333333] mb-6">Select Course goal:</h2>
            <div className="flex flex-row ">

              <GoalCard img="../../public/assets/Personal Development.svg" title="Personal Development" onClick={handleGoalSelect} />
              <GoalCard img="../../public/assets/Career Growth.svg" title="Career Growth" onClick={handleGoalSelect} />
              <GoalCard img="../../public/assets/leaner.svg" title="Exam preparation" onClick={handleGoalSelect} />
              <GoalCard img="../../public/assets/Others.svg" title="Others" onClick={handleGoalSelect} />
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
        {course.data.materials.map((file) => (
          <CourseMaterialTag title={file.title} description={file.description} fileType={file.type} deleteCourseMaterialFromDB={deleteCourseMaterialFromDB} materialId={file._id} courseId={file.courseId} />
        ))}
        {files.map((file) => (
          <CourseMaterialTag title={file.title} description={file.description} fileType={file.fileType} deleteMaterial={deleteMaterial} materialId={1} />
        ))}




        <button onClick={() => setIsPopupOpen(true)} className="bg-[#040BC5]  text-white px-6 py-[12px] rounded-[8px] mt-6 mb-8 ">Upload Materials</button>
        <h2 className="text-2xl font-semibold text-[#333333] mb-6">Quiz Configuration</h2>
        <div className="flex flex-row border  bg-[#f3f5f9] border-[#cdcef3] relative text-[16px]  p-4 rounded-[8px] mb-6 min-h-[87px] max-w-[1068px] items-center text-[#333333] ">
          <img src="../../public/assets/Quiz1.svg" alt="hands" className='mr-[24px]' />
          <p>This quiz configuration will be applied to all modules and quizzes you take for the course.
            You can change config for a specific quiz before starting the quiz.</p>
          <img src="../../public/assets/Close.svg" alt="close" className='absolute top-[8px] right-[8px]' />
        </div>
        <div className="flex flex-row">
          <QuizDropDown options={options} onSelect={setQuizType} selectedVal={quizType} width={'477px'} desc={'Select Quiz Type (can select more than one)'} />
          <div className="text-[16px] text-[#aaaaaa] w-[477px] h-[48px] rounded-xl border border-[#aaaaaa] px-3 py-4 flex items-center">
            <input type="text" defaultValue={course.data.quizConfig.numberOfQuestions} name="" id="" placeholder="Enter required number of questions" className="focus:outline-0 w-full" ref={numberOfQuestionsRef} />

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
        <button onClick={async () => await handleUpload()} className="bg-[#040BC5] mt-[40px]   text-white p-[12px] rounded-[8px] w-[248px] ">Update Course</button>

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

export default EditNewCoursePage;
