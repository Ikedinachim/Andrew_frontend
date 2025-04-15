import React, { useState } from 'react';


interface MCQItemProps {
  content: string;
  correct: boolean;
  onSelect?: () => void;
  isDisabled: boolean; // New prop to control if item can be selected
  setIsDisabled: (value: boolean) => void; // New prop to set disabled state
}

const MCQItem: React.FC<MCQItemProps> = ({
  content,
  correct,
  onSelect,
  isDisabled,
  setIsDisabled,
  isSelected,
  setIsSelected,
  questionType,
}) => {


  const handleClick = () => {
    // Prevent selection if already disabled
    if (isDisabled && !isSelected) return;

    // Only allow selection if not already selected
    if (!isSelected) {
      setIsSelected(true);
      setIsDisabled(true); // Disable all options after selection
      if (onSelect) {
        onSelect();
      }
    }
  };

  const getBorderStyles = () => {
    if (!isSelected) return 'border-gray-200';
    return correct ? 'border-purple-600' : 'border-red-500';
  };

  if (questionType == 'Open-ended') {
    return (
      <div className='h-[100vh] flex flex-col items-center '>
        <div className=''>
          <div className="w-[1011px] bg-gray-200 rounded-full h-2.5 mr-2 mt-13 ">
            <div className="bg-[#040BC5] h-2.5 rounded-full w-[76px]"></div>
          </div>
          <div className='w-[808px] mx-auto'>
            <h2 className='font-semibold text-[32px] text-[#333333]  mt-[103px] mb-[90px] text-center mx-auto'>{content}</h2>
            <textarea name="afdaf" id="" placeholder="Type your answer here..." className=" focus:outline-0 h-[221px] w-full border-1 border-[#cdcef3] rounded-3xl p-5"></textarea>

          </div>
        </div>

      </div>
    )
  }

  return (
    <div
      onClick={handleClick}
      className={`
        relative 
        border-4 
        ${getBorderStyles()} 
        rounded-lg 
        p-8 
        ${!isDisabled || isSelected ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'} 
        transition-all 
        duration-300
        ${(!isDisabled || isSelected) && 'hover:bg-gray-50'}
      `}
    >
      {isSelected && (
        <>
          {correct ? (
            <div className="absolute -top-4 -right-4">
              <img
                src="../../public/assets/Success.svg"
                alt="Correct"
                className="w-8 h-8"
              />
            </div>
          ) : (
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full" >
              <img
                src="../../public/assets/wrong.svg"
                alt="Correct"
                className="w-8 h-8"
              />
            </div>

          )}
        </>
      )}

      <p className="text-gray-800 text-2xl">{content}</p>
    </div>
  );
};

export default MCQItem;
