import React from "react";

const Topbar: React.FC = () => {

 

  return (
    <div className="flex items-center justify-between mb-6">
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-500">
                <img src="../../public/assets/Search.svg" alt="" />
              </span>
              <input
                type="text"
                placeholder="Search"
                className="bg-[#F3F5F9] rounded-full pl-10 pr-4 py-2 w-[312px]"
              />
            </div>

            {/* <div className="flex items-center">
              <i className="fas fa-bell text-gray-600 mr-4"></i>
              <img src="../../public/assets/Logout.svg" className='w-8 h-auto' alt="" />
              <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            </div> */}

            <div className="relative group">
              <button onClick={() => signOutHandler()} className="cursor-pointer">
                <img src="../../public/assets/Logout.svg" className="w-8 h-auto" alt="Logout" />
              </button>

              {/* Tooltip */}
              <div className="absolute top-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                Logout
              </div>
            </div>

          </div>
  );
};

export default Topbar;
