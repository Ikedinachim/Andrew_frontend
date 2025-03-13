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
  setIsDisabled 
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

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
                src="../../src/assets/Success.svg"
                alt="Correct"
                className="w-8 h-8"
              />
            </div>
          ) : (
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full" />
          )}
        </>
      )}
      
      <p className="text-gray-800 text-2xl">{content}</p>
    </div>
  );
};

export default MCQItem;
