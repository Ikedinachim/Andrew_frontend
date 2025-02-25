import React from 'react';

const GoalCard = (props) => {
    return (
        
           
              <div className='mr-4'>
                <div className=" w-[132px] h-[120px] flex flex-col items-center justify-between px-4 py-[14px] border-1 border-[#cdcef3] rounded-[8px]">
                  <img src= {props.img} alt="" />
                  <p className=" font-semibold text-[16px] text-[#333333] text-center ">{props.title}</p>
                </div>
            </div>
        
    );
};

export default GoalCard;