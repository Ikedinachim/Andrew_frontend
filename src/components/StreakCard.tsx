import React from "react";

const StreakCard: React.FC = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const activeDays = ["Sun", "Mon", "Tue"]; // Active streak days
  const bestStreak = 5;

  return (
    <div className="bg-white px-6 pt-2 pb-4 rounded-xl shadow-xl mb-3">
      <div className="flex items-center mb-2">
        <span className="text-[50px] text-[#FEC260] font-bold mr-2">3</span>
        <span className="self-start text-lg text[#333333] pt-4 font-normal">Day Streak</span>
      </div>
      <div className="flex justify-between">
        {days.map((day) => (
          <div
            key={day}
            className={`flex flex-col items-center p-2 rounded-lg ${activeDays.includes(day) ? "bg-[#F3F5F9]" : ""}`}
          >
            <img src="../../public/assets/Streak.svg" alt="" />
            <span className="text-xs text-[#333333] mt-1">{day}</span>
          </div>
        ))}
      </div>
      <p className="text-[#AAAAAA] text-xs mt-4">Your best streak is {bestStreak} days</p>
    </div>
  );
};

export default StreakCard;
