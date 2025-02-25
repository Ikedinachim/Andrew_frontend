import React from "react";

const Topbar: React.FC = () => {

 

  return (
    <div className="flex items-center justify-between mb-6">
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-500">
                <img src="../../src/assets/Search.svg" alt="" />
              </span>
              <input
                type="text"
                placeholder="Search"
                className="bg-[#F3F5F9] rounded-full pl-10 pr-4 py-2 w-[312px]"
              />
            </div>

            <div className="flex items-center">
              <i className="fas fa-bell text-gray-600 mr-4"></i>
              <img src="../../src/assets/Notification.svg" className='mr-6' alt="" />
              <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            </div>
          </div>
  );
};

export default Topbar;
