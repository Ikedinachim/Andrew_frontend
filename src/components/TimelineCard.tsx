import React from 'react';

interface TimelineCardProps {
    title: string;
    isSelected?: boolean;
    onClick: (title: string) => void;
  }
  
  const TimelineCard: React.FC<TimelineCardProps> = ({ title, isSelected = false, onClick }) => {
    return (
        <div className={`cursor-pointer mr-4 ${isSelected ? ' outline-2 outline-blue-500' : 'hover:outline hover:outline-2 hover:outline-gray-300'}`}>

        <div onClick={() => onClick(title)} className=" mr-4 w-[101px] h-[120px] flex items-center justify-center px-4 py-[14px] border-1 border-[#cdcef3] rounded-[8px]">
        <p className="text-[16px] text-[#333333] text-center font-semibold">{title}</p>
      
    </div>
        </div>
    );
};

export default TimelineCard;