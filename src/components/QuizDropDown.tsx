import React, { useState } from 'react';

function QuizDropDown({ options, onSelect, selectedVal, width, desc }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    onSelect(value);
    // setSelectedValue(value);
    setIsOpen(false);
  };
``
  return (
    <div className="dropdown mr-6">
      <button onClick={toggleDropdown} className= {`flex flex-row justify-between items-center text-[16px] text-[#aaaaaa] w-[${width}] h-[48px] rounded-xl border border-[#aaaaaa] px-3 py-4`}>
        {selectedVal || desc}
        <img src="../../src/assets/Dropdown.svg" alt="" />
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li className='cursor-pointer my-1 border' key={option.value} onClick={() => handleOptionClick(option.value)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuizDropDown;