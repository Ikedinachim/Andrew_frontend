import React from 'react';

const TimelineCard = (props) => {
    return (
        
        <div onClick={props.onClick(props.title)} className=" mr-4 w-[101px] h-[120px] flex items-center justify-center px-4 py-[14px] border-1 border-[#cdcef3] rounded-[8px]">
        <p className="text-[16px] text-[#333333] text-center font-semibold">{props.title}</p>
      
    </div>
    );
};

export default TimelineCard;