import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PerformanceTrendProps {
  data: { name: string; value: number }[];
  improvement: number;
}

const PerformanceTrend: React.FC<PerformanceTrendProps> = ({ data, improvement }) => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-xl h-[268px] w-[335px]">
      <h2 className="text-lg font-semibold">Performance Trend</h2>
      <p className="text-sm text-gray-600 mt-1">
        <span className="text-green-600 font-semibold">{improvement}%</span> improvement from last quiz
      </p>
      <div className="w-full h-48 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#1D4ED8" strokeWidth={3} dot={{ r: 6, fill: "#1D4ED8" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceTrend;
