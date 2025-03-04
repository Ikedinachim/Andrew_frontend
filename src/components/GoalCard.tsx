import React from 'react';

interface GoalCardProps {
  img: string;
  title: string;
  isSelected?: boolean;
  onClick: (title: string) => void;
}
const GoalCard: React.FC<GoalCardProps> = ({ img, title, isSelected = false, onClick }) => {
  return (
    <div className={`cursor-pointer mr-4 ${isSelected ? 'outline outline-2 outline-blue-500' : 'hover:outline hover:outline-2 hover:outline-gray-300'}`} onClick={() => onClick(title)}>
      <div className=" w-[132px] h-[120px] flex flex-col items-center justify-between px-4 py-[14px] border-1 border-[#cdcef3] rounded-[8px]">
        <img src={img} alt="" />
        <p className=" font-semibold text-[16px] text-[#333333] text-center ">{title}</p>
      </div>
    </div>

  );
};

export default GoalCard;