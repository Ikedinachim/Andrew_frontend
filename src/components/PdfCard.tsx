import React from 'react';

const PdfCard = (props) => {
    return (
        <div className='h-auto w-[834px] bg-white mb-4 shadow-md px-5 py-7 relative flex flex-row items-center justify-between rounded-md'>
            <div className='flex flex-row'>

                {props.type == 'link'? <img src="/assets/URL.svg" alt="" /> : <img src="/assets/PDF.svg" alt="" />}

                <div className='flex flex-col justify-start items-start ml-[23px] mr-8'>
                    <h2 className='text-md font-semibold text-[#333333]'>{props.title}</h2>
                    <p className='text-sm font-normal text-[#AAA] mt-2 line-clamp-2'>{props.description}</p>
                </div>
                
            </div>
            <div className='flex flex-row no-wrap min-w-[10%]'>
                <p className=' text-[#333333] font-semibold text-[16px]'>Type:{props.type.toUpperCase()}</p>
            </div>
        
        </div>
    );
};

export default PdfCard;