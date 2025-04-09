import React, { useState } from 'react';
import MCQItem from '../components/MCQItem';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const OpenEndedPage = (props) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const questions = [
        {
            content: 'int x  = 10',
            correct: false,
        },
        {
            content: 'x  = 10',
            correct: true,
        },
        {
            content: 'variable x  = 10',
            correct: false,
        },
        {
            content: 'declare x  = 10',
            correct: false,
        },
    ]
    return (
        <div className='h-[100vh] flex flex-col items-center '>
            <div className=''>
                <div className="w-[1011px] bg-gray-200 rounded-full h-2.5 mr-2 mt-13 ">
                    <div className="bg-[#040BC5] h-2.5 rounded-full w-[76px]"></div>
                </div>
                <div className='w-[808px] mx-auto'>
                <h2 className='font-semibold text-[32px] text-[#333333]  mt-[103px] mb-[90px] text-center mx-auto'>{props.question}</h2>
                <textarea name="afdaf"  id="" placeholder="Type your answer here..." className=" focus:outline-0 h-[221px] w-full border-1 border-[#cdcef3] rounded-3xl p-5"></textarea>

                </div>
                </div>
            
        </div>
    );
};

export default OpenEndedPage;