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
    <div className="flex flex-col h-[268px] w-[335px] pt-[56px] items-center bg-white shadow-md  p-6 rounded-xl">
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
          stroke="#1D4ED8"
          strokeWidth="8"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
        />
      </svg>
      <p className="text-xl font-semibold text-black mt-[-34px] mb-9">{correct}/{total}</p>
      <div className="flex justify-between w-full mt-2">
        <div className="text-center">
          <p className="text-blue-600 font-bold">{correct}</p>
          <p className="text-sm text-gray-500">Correct Answer</p>
        </div>
        <div className="text-center">
          <p className="text-yellow-600 font-bold">{incorrect}</p>
          <p className="text-sm text-gray-500">Incorrect Answer</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressArc;
