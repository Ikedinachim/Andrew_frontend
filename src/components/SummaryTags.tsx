import React from 'react';

const SummaryTags = (props) => {
    return (
        <div>
            <div className='w-[258px] h-[116px] rounded-2xl shadow-md p-6 flex flex-row justify-between'>
                <div>
                    <p className='text-[#AAAAAA] text-[16px] font-normal mb-2'>{props.topic}</p>
                    <p className='text-[#333333] text-[16px] font-semibold'>{props.subTopic}</p>
                </div>
                <div className={`${props.good ? 'text-[#00ED6D]' : 'text-[#D42953]'} font-semibold text-[12px]`}>
                    {props.good ? <img src="../../src/assets/GreenGraph.svg" alt="" /> : <img src="../../src/assets/RedGraph.svg" alt="" /> }
                    <p>{props.remark}</p>
                    <p>{props.subremark}</p>
                </div>

            </div>
        </div>
    );
};

export default SummaryTags;