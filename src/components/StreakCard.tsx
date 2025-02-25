import React from "react";

const StreakCard: React.FC = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const activeDays = ["Sun", "Mon", "Tue"]; // Active streak days
  const bestStreak = 5;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md m-w-96 mb-3">
      <div className="flex items-center text-2xl font-semibold mb-4">
        <span className="text-[64px] text-yellow-500 font-bold mr-2">3</span> Day Streak
      </div>
      <div className="flex justify-between">
        {days.map((day) => (
          <div
            key={day}
            className={`flex flex-col items-center p-2 rounded-lg ${activeDays.includes(day) ? "bg-gray-100" : ""}`}
          >
            <img src="../../src/assets/Streak.svg" alt="" />
            <span className="text-[16px] font-semibold text-[#333333]">{day}</span>
          </div>
        ))}
      </div>
      <p className="text-gray-500 text-sm mt-4">Your best streak is {bestStreak} days</p>
    </div>
  );
};

export default StreakCard;
