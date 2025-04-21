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
        if (reportData.data.data.length == 0) {
            return(
            <div className='flex flex-col items-center justify-center'>
            <img src="../../public/assets/no_course.svg" alt="" />
            <h1 className='font-semibold text-[28px] text-[#333333] max-w-[499px] mt-4 mb-8 text-center'>No performance report to show yet!! 
              Please add new courses to get started</h1>
              <button onClick={ () => navigate('/dashboard/add-new-course')} className=" text-white bg-[#040BC5] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 py-3 px-8 rounded-[8px] font-semibold text-[16px]">
                + &nbsp; Add New Course
              </button>
        
            </div>)
          }
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
            {reportData.data.data.map((report, index) => {
                    return <ReportCard key={index} title={report.title} desc={report.description} id={report._id} courseId={report.courseId} score = {report.maxScore} questions = {report.totalQuestions} date = {report.createdAt} />
                } )}
            </div>



        </div>
    );
};

export default PerformanceReportPage;