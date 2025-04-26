import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getModuleDetail, resetModuleDetailStatus } from '../features/moduleDetailSlice';
import { useEffect } from 'react';

const ModuleListCard = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {moduleDetailData, moduleDetailStatus, moduleDetailError} = useSelector((state) => state.moduleDetail);
    // useEffect(() => {
    //     if (moduleDetailStatus == 'failed'){
    //         dispatch(resetModuleDetailStatus())
    //         alert( `Fetching Module failed: ${moduleDetailError}`)
        
    //     }
    //     if (moduleDetailStatus == 'success'){
            
    //         dispatch(resetModuleDetailStatus())
    //         navigate(`/dashboard/module-details/${props._id}`)
    //     }
    // }, [moduleDetailStatus, dispatch, navigate])
    const continueModuleHandler = () => {
        dispatch(getModuleDetail(props._id));
        navigate(`/dashboard/module-details/${props._id}`)
        console.log('continue module handler', moduleDetailStatus);
        
    }
    return (
        <div className="bg-white p-7 rounded-2xl shadow-md mb-6 relative mr-6">
            <div className='max-w-full md:max-w-[80%]'>
                <p className='text-[12px] font-semibold '>
                    <div className='flex flex-row items-center mb-2'>
                        <span className='text-[12px] text-[#AAA] mr-3'>Module {props.order}</span>
                        <span className='text-[12px] text-[#AAAAAA] mr-1 pb-1'>  |  </span>
                        <div className='w-[5px] h-[5px] rounded-[100%] bg-[#00ED6D] mx-2'></div>
                        <span className='text-[#00ED6D] mr-2'> On-Track</span>
                    </div>
                </p>
                <h2 className="text-xl font-bold text-[#333333] mb-2 leading-loose">
                    {props.title}
                </h2>
                <p className="text-[#AAAAAA] w-full text-base line-clamp-3 mb-4">{props.description}</p>
                {/* <p className='text-[12px] font-semibold mt-3 mb-4 '>
                    <div className='flex flex-row items-center text-[#FEC260]'>
                        <span className='text-[12px] '>Complete module by 02/05 to stay on track |</span>
                        <span className=' mr-2'> 4 weeks left</span>
                    </div>
                </p> */}

                <p className='font-semibold mb-4'>Current Score- </p>
                <button className="bg-[#040bc5] border-2 border-[#040bc5] text-white text-base px-4 py-2 rounded-lg mr-3 hover:shadow-lg hover:bg-[#585CD8] hover:border-[#585CD8] cursor-pointer" onClick={() => continueModuleHandler()}>Continue Module</button>
                <button className=" border-2 border-[#040BC5] text-[#040BC5] px-4 py-2 rounded-lg mr-2 hover:shadow-xl hover:border-[#00ED6D] hover:text-[#333] cursor-pointer ">Mark as Complete</button>

            </div>
        </div>
    );
};

export default ModuleListCard;