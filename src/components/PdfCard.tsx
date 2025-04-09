import React from 'react';

const PdfCard = (props) => {
    return (
        <div className=' w-[834px] bg-white shadow-md p-5 relative flex flex-row items-center justify-between mb-6'>
            <div className='flex flex-row'>

            {props.type == 'link'? <img src="../../src/assets/URL.svg" alt="" /> : <img src="../../src/assets/PDF.svg" alt="" />}
            <div className=' flex flex-col justify-start items-start ml-[23px] max-w-[554px]'>
                    <h2 className='text-xl font-semibold text-[#333333]'>{props.title}</h2>
                    <p className='text-[14px] font-[400px] text-[#333333] '>{props.description}</p>
                </div>
            </div>
            <p className=' text-[#333333] font-semibold text-[16px]'>Type:{props.type.toUpperCase()}</p>

        </div>
    );
};

export default PdfCard;