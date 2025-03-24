import React from 'react';
import Tag from '../components/tag';

const UserProfile = () => {
    return (
        <div className='flex flex-col w-[820px]'>
            <div className='rounded-[8px] shadow-md w-full p-6 mb-8'>
                <h2 className='font-semibold text-[#333333] text-2xl mb-5'>About</h2>
                <p className='text-[16px] text-[#333333]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam ultricies, nisl nunc aliquet nunc, quis aliquam nisl nunc quis nisl. Sed euismod, diam quis aliquam ultricies, nisl nunc aliquet nunc, quis aliquam nisl nunc quis nisl.</p>

            </div>
            <div className='flex flex-col w-full p-6 rounded-[8px] shadow-md mb-8'>
                <h2 className='font-semibold text-[#333333] text-2xl mb-5'>Primary Goal</h2>
                <div className='flex flex-row'>
                    <Tag content='Prepare for exams' />
                    <Tag content='Learn New Skills' />
                    <Tag content='Career Advancement' />

                </div>
            </div>

            <div className='flex flex-col w-full p-6 rounded-[8px] shadow-md mb-8'>
                <h2 className='font-semibold text-[#333333] text-2xl mb-5'>Preferred learning format</h2>
                <div className='flex flex-row'>
                    <Tag content='Videos' />
                    <Tag content='Articles/Pdfs' />
                    <Tag content='Gamified Challenges' />

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

export default UserProfile;