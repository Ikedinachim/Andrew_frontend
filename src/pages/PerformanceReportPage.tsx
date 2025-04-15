import React from 'react';
import ReportCard from '../components/ReportCard';

const PerformanceReportPage = () => {
    return (
        <div>
            <h2 className="text-3xl font-semibold text-[#333333] mt-4 ml-4 mb-3">
            Performance Reports
            </h2>

            <div className="flex justify-between items-center px-4 mt-6">
                <p className="text-sm text-[#AAAAAA]">
                    See all the reports of your quizzes
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 p-4 max-w-7xl mx-auto mt-4">
                <ReportCard />
                <ReportCard />
                <ReportCard />
                <ReportCard />
            </div>



        </div>
    );
};

export default PerformanceReportPage;