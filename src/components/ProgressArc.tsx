import React from "react";

interface ProgressArcProps {
  correct: number;
  total: number;
}

const ProgressArc: React.FC<ProgressArcProps> = ({ correct, total }) => {
  const incorrect = total - correct;
  const percentage = (correct / total) * 180;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(percentage / 360) * circumference} ${circumference}`;

  return (
    <div className="flex flex-col pt-[56px] items-center bg-white shadow-lg  p-6 rounded-xl">
      <svg width="185" height="93" viewBox="0 0 120 40">
        <path
          d="M 10 50 A 40 40 0 0 1 110 50"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="8"
        />
        <path
          d="M 10 50 A 40 40 0 0 1 110 50"
          fill="none"
          stroke="#040BC5"
          strokeWidth="8"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
        />
      </svg>
      <p className="text-xl font-semibold text-black mt-[-34px] mb-9">{correct}/{total}</p>
      <div className="flex justify-between w-[80%] mt-4">
        <div className="text-center">
          <p className="text-[#040BC5] font-bold">{correct}</p>
          <p className="text-sm text-gray-500">Correct</p>
        </div>
        <div className="text-center">
          <p className="text-[#D42953] font-bold">{incorrect}</p>
          <p className="text-sm text-gray-500">Incorrect</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressArc;
