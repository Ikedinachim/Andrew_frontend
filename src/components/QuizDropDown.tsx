import React, { useState } from 'react';

function QuizDropDown({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="dropdown mr-6">
      <button onClick={toggleDropdown} className= 'flex flex-row justify-between items-center text-[16px] text-[#aaaaaa] w-[477px] h-[48px] rounded-xl border border-[#aaaaaa] px-3 py-4'>
        {selectedValue || 'Select Quiz Type (can select more than one)'}
        <img src="../../src/assets/Dropdown.svg" alt="" />
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li key={option.value} onClick={() => handleOptionClick(option.value)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuizDropDown;