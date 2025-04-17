import React from "react";
import { useSelector } from "react-redux";

const GreetingCard: React.FC = () => {

  const {user, status, error} = useSelector((state: any) => state.user)

  console.log(user.data.name);
  

  return (
    <div className="flex flex-row bg-[#F3F5F9] relative text-[20px]  p-4 rounded-[8px] mb-6 min-h-[87px] font-semibold items-center text-black ">
    <img src="/assets/hand_waving.svg" alt="hands" className='mr-[24px]' />
    <p>Hi {user.data.name}, I’m proud of you for showing up today! Ready to learn?</p>
    <img src="/assets/Close.svg" alt="close" className='absolute top-[8px] right-[8px]' />
  </div>
  );
};

export default GreetingCard;
