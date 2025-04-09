import React from 'react';

const CourseMaterialTag = (props) => {
    return (
        <div className='h-[80px] w-[834px] bg-white mb-4 shadow-md p-5 relative flex flex-row items-center justify-between '>
        <div className='flex flex-row'>

          {props.fileType == 'URL' || props.fileType == 'link'? <img src="../../src/assets/URL.svg" alt="" /> : <img src="../../src/assets/PDF.svg" alt="" />}
          <div className='h-[40px] flex flex-col justify-start items-start ml-[23px]'>
            <h2 className='text-xl font-semibold text-[#333333]'>{props.title}</h2>
            <p className='text-[14px] font-[400px] text-[#333333] '>{props.description}</p>
          </div>
        </div>
        <div className='flex flex-row'>
          <p className=' text-[#333333] font-semibold text-[16px]'>Type:{props.fileType}</p>
          <div className='ml-[51px] flex flex-col h-10 items-center justify-between text-[10px] font-normal '>
            <img src="../../src/assets/Replace.svg" alt="" />
            <p>Replace file</p>
          </div>
        </div>
        <img onClick={() => { props.materialId != 1 ? props.deleteCourseMaterialFromDB(props.materialId, props.courseId) : props.deleteMaterial(props.title, props.description)}} className=' cursor-pointer absolute right-[-10px] top-[-10px]' src="../../src/assets/CloseCircle.svg" alt="" />
      </div>
    );
};

export default CourseMaterialTag;