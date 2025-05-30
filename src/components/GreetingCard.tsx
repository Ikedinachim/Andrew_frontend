import React from "react";
import { useSelector } from "react-redux";

const GreetingCard: React.FC = (props) => {

  const {user, status, error} = useSelector((state: any) => state.user)

  
  

  return (
    <div className="flex flex-row bg-[#F3F5F9] relative text-[20px]  p-4 rounded-[8px] mb-6 min-h-[87px] font-semibold items-center text-black ">
    <img src="/assets/hand_waving.svg" alt="hands" className='mr-[24px]' />
    <p>Hi {user?.data?.name}, I’m proud of you for showing up today! Ready to learn?</p>
    <img src="/assets/Close.svg" alt="close" className='cursor-pointer absolute top-[8px] right-[8px]' onClick={props.close}/>
  </div>
  );
};

export default GreetingCard;
