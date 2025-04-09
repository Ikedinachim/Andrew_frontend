import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getModuleDetail, resetModuleDetailStatus } from '../features/moduleDetailSlice';
import { useEffect } from 'react';

const ModuleListCard = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {moduleDetailData, moduleDetailStatus, moduleDetailError} = useSelector((state) => state.moduleDetail);
    useEffect(() => {
        if (moduleDetailStatus == 'failed'){
            dispatch(resetModuleDetailStatus())
            alert( `Fetching Module failed: ${moduleDetailError}`)
        
        }
        if (moduleDetailStatus == 'success'){
            
            dispatch(resetModuleDetailStatus())
            navigate(`/dashboard/module-details/${props._id}`)
        }
    }, [moduleDetailStatus, dispatch, navigate])
    const continueModuleHandler = () => {
        dispatch(getModuleDetail(props._id))
        console.log('continue module handler', moduleDetailStatus);
        
       

    }
    return (
        <div className="bg-white p-6 rounded-md shadow-md mb-6 relative ">
            <div className='max-w-[712px]'>
                <p className='text-[12px] font-semibold '>
                    <div className='flex flex-row items-center'>

                        <span className='text-[12px] text-[#AAAAAA]'>Module {props.order} | </span>
                        <div className='w-[5px] h-[5px] rounded-[100%] bg-[#00ED6D] mx-2'></div>
                        <span className='text-[#00ED6D] mr-2'> On-Track</span>
                    </div>
                </p>
                <h2 className="text-xl font-bold text-[#333333]">
                    {props.title}
                </h2>
                <p className="text-[#AAAAAA] w-full text-[16px] ">{props.description}
                </p>
                <p className='text-[12px] font-semibold mt-3 mb-4 '>
                    <div className='flex flex-row items-center text-[#FEC260]'>

                        <span className='text-[12px] '>Complete module by 02/05 to stay on track |</span>
                        <span className=' mr-2'> 4 weeks left</span>
                    </div>
                </p>

                <p className='font-semibold mb-2 '>Current Score- </p>
                <button className="bg-white border-[#040bc5] border-4 text-[#040bc5] font-semibold text-[16px]   px-4 py-2 rounded-md mr-2" onClick={() => continueModuleHandler()}>Continue Module</button>


            </div>
        </div>
    );
};

export default ModuleListCard;