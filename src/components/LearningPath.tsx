import { useState } from "react";
import { motion } from "framer-motion";

const modules = [
  { id: 1, title: "Module 1", description: "Introduction to Python for Data Science" },
  { id: 2, title: "Module 2", description: "Data Manipulation with Numpy & Python" },
  { id: 3, title: "Module 3", description: "Data Visualization with Matplotlib & Seaborn" },
  { id: 4, title: "Module 4", description: "More Advanced Topics" },
  { id: 5, title: "Module 5", description: "Even More Topics" },
  { id: 6, title: "Module 6", description: "Final Concepts" },
];
  
  const pathCoordinates = [
    { x: 50, y: 300 },
    { x: 150, y: 200 },
    { x: 250, y: 250 },
    { x: 350, y: 150 },
    { x: 450, y: 180 },
    { x: 550, y: 100 },
  ];

const LearningPath = () => {
  return (
    <div className="relative w-full h-[400px] bg-white p-6 rounded-lg shadow-lg">
      {/* SVG Path */}
      <svg className="absolute top-0 left-0 w-full h-full" fill="none" strokeWidth="4">
        <path
          d={
            "M" +
            pathCoordinates
              .map((point) => `${point.x},${point.y}`)
              .join(" L ")
          }
          stroke="#4A90E2"
          strokeWidth="4"
          fill="none"
        />
      </svg>

      {/* Modules */}
      {modules.map((module, index) => (
        <motion.div
          key={module.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="absolute flex flex-col items-center"
          style={{
            left: `${pathCoordinates[index].x}px`,
            top: `${pathCoordinates[index].y}px`,
          }}
        >
          <div className="w-12 h-12 flex items-center justify-center text-white text-lg font-bold rounded-full bg-blue-500 border-4 border-white shadow-md">
            {module.id}
          </div>
          <div className="mt-2 text-center">
            <h3 className="text-sm font-bold">{module.title}</h3>
            <p className="text-xs text-gray-500">{module.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default LearningPath;