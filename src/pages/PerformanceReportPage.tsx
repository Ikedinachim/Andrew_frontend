import React from 'react';
import ReportCard from '../components/ReportCard';

const PerformanceReportPage = () => {
    return (
        <div>
            <h1 className='font-semibold text-[#333333] text-[32px] mb-[12px]'>Performance Reports</h1>
            <p className='font-normal text-xl text-[#aaaaaa] mb-[32px]'>See all reports of your Quizes</p>
            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4  mx-auto w-full'>

            <ReportCard />
            <ReportCard />
            <ReportCard />
            <ReportCard />
            </div>



        </div>
    );
};

export default PerformanceReportPage;