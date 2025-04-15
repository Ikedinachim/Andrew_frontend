import React from 'react';

interface TimelineCardProps {
    title: string;
    isSelected?: boolean;
    onClick: (title: string) => void;
  }
  
  const TimelineCard: React.FC<TimelineCardProps> = ({ title, isSelected = false, onClick }) => {
    return (
        <div className={`cursor-pointer mr-4 ${isSelected ? 'outline-2 outline-[#040BC5]' : 'hover:outline-2 hover:outline-[#040BC5]'}`}>

        <div onClick={() => onClick(title)} className="w-[120px] h-[120px] flex items-center justify-center px-4 py-[14px] border-1 border-[#cdcef3] rounded-lg">
        <p className="text-sm text-[#333333] text-center font-semibold">{title}</p>
      
    </div>
        </div>
    );
};

export default TimelineCard;