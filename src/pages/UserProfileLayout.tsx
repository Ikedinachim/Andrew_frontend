import React from 'react';
import Tag from '../components/tag';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../features/userSlice';

const UserProfileLayout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signOutHandler = () => {
        dispatch(signOut())
        navigate('/sign-in')
    
    }
    return (
        <div className='flex flex-row'>
            <div className="flex flex-col w-[224px] items-center text-center mr-6">
                <div className='shadow-md bg-green-300 w-full rounded-[8px]'>
                    <img className='w-25 h-25 object-cover rounded-[100%] mt-[20px] mb-[16px] mx-auto ' src="../../src/assets/profile.svg" alt="" />
                    <p className='font-semibold text-[14px] text-white'>Shikhar Pokharel</p>
                    <p className='text-[12px] text-white mt-3'>UI/UX Designer</p>
                    <div className='flex flex-row mt-3 w-20 justify-between mx-auto'>
                        <img src="../../src/assets/facebook.svg" alt="" />
                        <img src="../../src/assets/instagram.svg" alt="" />
                        <img src="../../src/assets/twitter.svg" alt="" />
                    </div>

                    <button className='bg-white rounded-2xl mt-5 flex flex-row items-center px-[14px] mb-8 py-[4px] mx-auto text-[#333333]'>
                        <img src="../../src/assets/edit1.svg" alt="" />
                        <p>Edit Profile</p>
                    </button>
                </div>

                <div className='w-[224px] py-4 rounded-[8px] shadow-md mt-3'>
                    <button className='h-10 w-[100%] py-[10px] px-5 text-left border-l-2 text-[16px] text-[#040BC5] border-l-[#040BC5]'>Details</button>
                    <button className='h-10 w-[100%] py-[10px] px-5 text-left text-[16px] '>Learning Stats</button>
                    <button className='h-10 w-[100%] py-[10px] px-5 text-left text-[16px] '>Account Settings</button>
                    <button className='h-10 w-[100%] py-[10px] px-5 text-left text-[16px] ' onClick={() => signOutHandler()}>Logout</button>

                </div>
                <div className='w-[224px] p-4 rounded-[8px] shadow-md mt-8 flex flex-col items-start'>
                    <h2 className='text-[#333333] font-semibold text-xl mb-5'>Contact Details</h2>
                    <p className='mb-2 font-semibold text-[16px] text-[#AAAAAA]'>Email:</p>
                    <p className='mb-4 ftext-[16px] text-[#333333]'>peterparker@gmail.com</p>

                    <p className='mb-2 font-semibold text-[16px] text-[#AAAAAA]'>Mobile No:</p>
                    <p className=' ftext-[16px] text-[#333333]'>+9779849702</p>


                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default UserProfileLayout;