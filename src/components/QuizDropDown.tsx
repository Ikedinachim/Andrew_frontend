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
    // <div className="dropdown mr-6">
    //   <button onClick={toggleDropdown} className= {`flex flex-row justify-between items-center text-sm text-[#AAAAAA] w-[${width}] h-[48px] rounded-lg border border-[#aaaaaa] px-3 py-4`}>
    //     {selectedVal || desc}
    //     <img src="../../public/assets/Dropdown.svg" alt="" />
    //   </button>
    //   {isOpen && (
    //     <ul className="dropdown-menu">
    //       {options.map((option) => (
    //         <li className='cursor-pointer my-1 border' key={option.value} onClick={() => handleOptionClick(option.value)}>
    //           {option.label}
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
    <div className="relative mr-6">
      <button
        onClick={toggleDropdown}
        className={`flex justify-between items-center text-sm text-[#333] w-[${width}] h-[48px] bg-white border border-[#AAAAAA] rounded-lg px-4 py-2 shadow-sm cursor-pointer`}
      >
        {selectedVal || desc}
        <img src="../../public/assets/Dropdown.svg" alt="Dropdown arrow" className="ml-2" />
      </button>

      {isOpen && (
        <ul className="absolute mt-2 z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg py-2">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="px-4 py-2 text-sm text-[#333] cursor-pointer hover:bg-[#F0F4FF] hover:text-[#040BC5] transition-all"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>

  );
}

export default QuizDropDown;