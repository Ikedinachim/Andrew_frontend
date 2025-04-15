import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PerformanceTrendProps {
  data: { name: string; value: number }[];
  improvement: number;
}

const PerformanceTrend: React.FC<PerformanceTrendProps> = ({ data, improvement }) => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-xl">
      <h2 className="text-lg font-semibold">Performance Trend</h2>
      <p className="text-sm text-[#AAAAAA] mt-1">
        <span className="text-[#00ED6D] font-semibold">{improvement}%</span> improvement from last quiz
      </p>
  
      <div className="w-full h-48 mt-4 ml-[-12px]">
        <ResponsiveContainer width="95%" height="100%">
          <LineChart data={data} margin={{ left: -18, right: 10, top: 10, bottom: 0 }}>
            <CartesianGrid 
              stroke="#F3F5F9"
              vertical={false}
            />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#AAAAAA"}} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#AAAAAA" }} axisLine={false} tickLine={false}/>
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#040BC5" 
              strokeWidth={3} 
              dot={{ r: 3, fill: "#040BC5" }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  
  );
};

export default PerformanceTrend;
