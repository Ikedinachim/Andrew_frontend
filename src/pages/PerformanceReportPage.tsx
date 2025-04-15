import React, { useEffect } from 'react';
import ReportCard from '../components/ReportCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReports } from '../features/reportSlice';
import LoadingPage from './LoadingPage';

const PerformanceReportPage = () => {
    const dispatch = useDispatch();
    const { reportData, reportStatus, reportError } = useSelector((state) => state.report)
    const { user, status, error } = useSelector((state) => state.user)
    useEffect(() => {
            // Fetch data from the API
            // Update the state with the fetched data
            console.log(user);
            
            dispatch(getAllReports(user.userId))
    
        }, [dispatch]);
    
        if (reportStatus == 'loading' || reportStatus == 'idle') {
            return <LoadingPage content='Fetching Reports' />
        }
        console.log(reportData.data.data);
    return (
        <div>
            <h1 className='font-semibold text-[#333333] text-[32px] mb-[12px]'>Performance Reports</h1>
            <p className='font-normal text-xl text-[#aaaaaa] mb-[32px]'>See all reports of your Quizes</p>
            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4  mx-auto w-full'>
            {reportData.data.data.map((report, index) => {
                    return <ReportCard key={index} title={report.title} desc={report.description} id={report._id} courseId={report.courseId} score = {report.maxScore} questions = {report.totalQuestions} date = {report.createdAt} />
                } )}
            
            </div>



        </div>
    );
};

export default PerformanceReportPage;