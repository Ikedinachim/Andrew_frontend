import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const navigate = useNavigate();
  interface StepItem {
    title: string;
    imgSrc: string;
    imgAlt: string;
  }
  
  interface Step {
    title: string;
    subtitle: string;
    items: StepItem[];
    allowMultiple: boolean;
  }
  const steps: Step[] = [
    {
        title: "How do you describe yourself?",
        subtitle: "Select One",
        items: [
          { title: 'Student', imgSrc: '../../src/assets/Student.png', imgAlt: 'Icon representing student' },
          { title: 'Professional', imgSrc: '../../src/assets/Professional 1.png', imgAlt: 'Icon representing professional' },
          { title: 'Lifelong Learner', imgSrc: '../../src/assets/Lifelong leraner 1.png', imgAlt: 'Icon representing Lifelong learner' },
        ],
        allowMultiple: false,
      },
    {
      title: "What's your primary goal?",
      subtitle: "Can Select More Than One",
      items: [
        { title: 'Prepare for exams', imgSrc: '../../src/assets/Exam 1.png', imgAlt: 'Icon representing exam preparation' },
        { title: 'Learn new skills', imgSrc: '../../src/assets/skills 1.png', imgAlt: 'Icon representing learning new skills' },
        { title: 'Improve knowledge in a specific field', imgSrc: '../../src/assets/Improve Knowledge 1.png', imgAlt: 'Icon representing improving knowledge in a specific field' },
        { title: 'Get certified / career advancement', imgSrc: '../../src/assets/Certified 1.png', imgAlt: 'Icon representing getting certified or career advancement' },
      ],
      allowMultiple: true,
    },
    {
      title: "How much time can you dedicate to learning per week?",
      subtitle: "Select One",
      items: [
        { title: 'Less than 3 hours', imgSrc: '../../src/assets/Less than 3 hours 1.png', imgAlt: 'Icon representing sad face' },
        { title: '3 - 5 hours', imgSrc: '../../src/assets/3-5 Hrs 1.png', imgAlt: 'Icon representing normal face' },
        { title: '5 - 10 hours', imgSrc: '../../src/assets/5-10 hrs 1.png', imgAlt: 'Icon representing smiling face' },
        { title: 'More than 10 hours', imgSrc: '../../src/assets/More than 10 hr 1.png', imgAlt: 'Icon representing joyful face' },
      ],
      allowMultiple: false,
    },
    {
        title: "Would you like reminders & progress notifications?",
        subtitle: "Select One",
        items: [
          { title: 'Yes', imgSrc: '../../src/assets/Yes 1.png', imgAlt: 'Icon representing alarm ringing' },
          { title: 'No', imgSrc: '../../src/assets/No.png', imgAlt: 'Icon representing alarm not ringing' },
        ],
        allowMultiple: false,
      },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }else{
        navigate('/dashboard');
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  const handleItemClick = (title: string) => {
    if (steps[currentStep].allowMultiple) {
      if (selectedGoals.includes(title)) {
        setSelectedGoals(selectedGoals.filter(goal => goal !== title));
      } else {
        setSelectedGoals([...selectedGoals, title]);
      }
    } else {
      setSelectedGoals([title]);
    }
  };

  return (
    <div className="bg-white flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold mb-2">{steps[currentStep].title}</h1>
          <p className="text-gray-500">{steps[currentStep].subtitle}</p>
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${steps[currentStep].items.length} gap-4 mb-8 transition-all duration-500 ease-in-out`}>
          {steps[currentStep].items.map((step, index) => (
            <div
              key={index}
              className={`bg-white shadow-md rounded-lg p-6 text-center border cursor-pointer ${selectedGoals.includes(step.title) ? 'border-blue-600' : 'border-gray-200'}`}
              onClick={() => handleItemClick(step.title)}
              style={{ width: '200px', height: '200px' }}
            >
              <img alt={step.imgAlt} className="mx-auto mb-4" height="50" src={step.imgSrc} width="50" />
              <p className="font-medium">{step.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center w-[80%] px-8 py-4 mx-auto">
        <button className="text-black font-bold" onClick={handleSkip}>Skip</button>
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <span key={index} className={`w-2 h-2 rounded-full ${currentStep === index ? 'bg-[#040BC5]' : 'bg-gray-300'}`}></span>
          ))}
        </div>
        <button className="bg-[#040BC5] text-white p-3 rounded-xl w-[248px]" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Onboarding;