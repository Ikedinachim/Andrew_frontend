import React from 'react';

const Tag = (props) => {
    return (
        <div className='bg-[#585CD8] px-4 py-[10px] rounded-xl mr-6 text-white text-[12px] font-semibold'>
        {props.content}
    </div>
    );
};

export default Tag;