import React from "react";

const GreetingCard: React.FC = () => {

 

  return (
    <div className="flex flex-row bg-[#F3F5F9] relative text-[20px]  p-4 rounded-[8px] mb-6 min-h-[87px] font-semibold items-center text-black ">
    <img src="../../src/assets/hand_waving.svg" alt="hands" className='mr-[24px]' />
    <p>Hi username, I’m proud of you for showing up today! Ready to learn?</p>
    <img src="../../src/assets/Close.svg" alt="close" className='absolute top-[8px] right-[8px]' />
  </div>
  );
};

export default GreetingCard;
