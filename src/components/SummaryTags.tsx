import React from 'react';

const SummaryTags = (props) => {
    return (
        <div>
            <div className='rounded-2xl shadow-md p-4 flex flex-row justify-between align-center mr-6'>
                <div>
                    <p className='text-[#AAAAAA] text-xs font-normal mb-2'>{props.topic}</p>
                    <p className='text-[#333333] text-sm font-semibold'>{props.subTopic}</p>
                </div>
                <div className={`${props.good ? 'text-[#00ED6D]' : 'text-[#D42953]'} font-semibold text-[10px]`}>
                    {props.good ? <img src="../../public/assets/GreenGraph.svg" alt="" /> : <img src="../../public/assets/RedGraph.svg" alt="" /> }
                    <p>{props.remark}</p>
                    <p>{props.subremark}</p>
                </div>

            </div>
        </div>
    );
};

export default SummaryTags;