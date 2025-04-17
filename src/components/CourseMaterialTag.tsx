import React from 'react';

const CourseMaterialTag = (props) => {
    return (
        <div className='h-auto w-[834px] bg-white mb-4 shadow-md px-5 py-8 relative flex flex-row items-center justify-between rounded-sm'>
        <div className='flex flex-row'>
          {props.fileType == 'URL' || props.fileType == 'link'? <img src="/assets/URL.svg" alt="" /> : <img src="/assets/PDF.svg" alt="" />}
          <div className='flex flex-col justify-start items-start ml-[23px]'>
            <h2 className='text-md font-semibold text-[#333333]'>{props.title}</h2>
            <p className='text-sm font-normal text-[#AAA] mt-1 line-clamp-2'>{props.description}</p>
          </div>
        </div>
        <div className='flex flex-row'>
          <p className=' text-[#333333] font-semibold text-base mr-20'>Type: {props.fileType}</p>
          <div className='flex flex-col h-10 items-center justify-between text-[10px] font-normal justify-self-end'>
            <img src="/assets/Replace.svg" alt="" />
            <p>Replace file</p>
          </div>
        </div>
        <img onClick={() => { props.materialId != 1 ? props.deleteCourseMaterialFromDB(props.materialId, props.courseId) : props.deleteMaterial(props.title, props.description)}} className=' cursor-pointer absolute right-[-10px] top-[-10px]' src="/assets/CloseCircle.svg" alt="" />
      </div>
    );
};

export default CourseMaterialTag;
