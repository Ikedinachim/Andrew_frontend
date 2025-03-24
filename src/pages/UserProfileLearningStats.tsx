import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import StreakCard from '../components/StreakCard';

const UserProfileLearningStats = () => {
    return (
        <div className='w-[820px]'>
            <div className='w-full flex flex-row justify-between'>
                <StreakCard />

                <div className='shadow-md  rounded-[15px] py-8 px-12 flex flex-col items-center justify-center'>
                    <h1 className='font-semibold text-[40px] text-[#040BC5]'>45 hrs</h1>
                    <p className='text-[#333333] font-semibold text-[16px]'>Total Study Hours</p>
                </div>

                <div className=' shadow-md p-6 rounded-2xl flex flex-col items-center justify-center'>
                    <CircularProgressbar className='h-[156px] font-semibold' value={65} text='65%' styles={buildStyles({
                        textColor: '#333333',
                        pathColor: '#1D4ED8',
                        trailColor: '#E5E7EB',
                        textSize: '24px',
                    })} />
                    <p className='mt-4 text-[#333333] font-semibold text-xl'> Accuracu Rate</p>

                </div>

            </div>
            <div className='w-full p-4 rounded-[8px] shadow-md mt-8 flex flex-col items-start'>
                <h2 className='text-[#333333] font-semibold text-xl mb-5'>Additional Details</h2>
                <div className=' flex flex-row justify-between w-full'>
                    <div className='w-[50%]'>
                        <p className='mb-2 font-semibold text-[16px] text-[#AAAAAA]'>Gender</p>
                        <p className='mb-4 ftext-[16px] text-[#0b0b0b]'>Male</p>

                        <p className='mb-2 font-semibold text-[16px] text-[#AAAAAA]'>Learning time per week:</p>
                        <p className=' ftext-[16px] text-[#333333]'>Less than 3 hours</p>

                    </div>
                    <div className='w-[50%]'>
                        <p className='mb-2 font-semibold text-[16px] text-[#AAAAAA]'>Mobile No:</p>
                        <p className='mb-4 ftext-[16px] text-[#333333]'>+9238984393</p>

                        <p className='mb-2 font-semibold text-[16px] text-[#AAAAAA]'>Reminded & Tracking Progress</p>
                        <p className=' ftext-[16px] text-[#333333]'>Yes</p>

                    </div>



                </div>


            </div>

            
        </div>
    );
};

export default UserProfileLearningStats;