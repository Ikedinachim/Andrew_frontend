import React from 'react';

interface GoalCardProps {
  img: string;
  title: string;
  isSelected?: boolean;
  onClick: (title: string) => void;
}
const GoalCard: React.FC<GoalCardProps> = ({ img, title, isSelected = false, onClick }) => {
  return (
    <div className={`cursor-pointer mr-4 ${isSelected ? 'outline-2 outline-[#040BC5]' : 'hover:outline-2 hover:outline-[#040BC5]'}`} onClick={() => onClick(title)}>
      <div className=" w-[132px] h-[120px] flex flex-col items-center justify-center px-4 border-1 border-[#cdcef3] rounded-lg">
        <img src={img} alt="" className='w-[35px] h-auto'/>
        <p className="text-sm text-[#333333] text-center mt-2 ">{title}</p>
      </div>
    </div>

  );
};

export default GoalCard;