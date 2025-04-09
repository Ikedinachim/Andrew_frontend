import React, { useState } from 'react';
import MCQItem from '../components/MCQItem';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MCQPage = () => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [current_index, setCurrentIndex] = useState(0);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const navigate = useNavigate();
    const { quizData, quizStatus, quizError } = useSelector((state) => state.quiz);
    const totalQuestions = quizData.data.totalQuestions;
    const selectHandler = () => {
        if  (current_index < totalQuestions){
            setCurrentIndex(current_index + 1);
            setIsDisabled(false);
            setIsSelected(false);
        }
    }
    const cancelHandler = () => {
        navigate(-1);
    };   
    let percentage = ((current_index / totalQuestions)* 100);
       
    return (
        <div className='h-[100vh] flex flex-col items-center '>
            <div className=''>
                <div className="w-[1011px] bg-gray-200 rounded-full h-2.5 mr-2 mt-13 ">
                    <div style={{ width: `${percentage}%` }} className={`bg-[#040BC5] h-2.5 rounded-full`}></div>
                </div>
                <h2 className='font-semibold text-[32px] text-[#333333] w-[808px] mt-[103px] mb-[90px] text-center mx-auto'>{quizData.data.questions[current_index].questionText}</h2>
                <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4 h-100 w-160 mx-auto text-center'>
                    {quizData.data.questions[current_index].options.map((answer, index) => {
                        return <MCQItem
                            key={index}
                            content={answer}
                            correct={quizData.data.questions[current_index].correctAnswer === answer}
                            isDisabled={isDisabled}
                            setIsDisabled={setIsDisabled}
                            onSelect={() => {
                                // Optional callback
                               
                            }}
                            isSelected={isSelected}
                            setIsSelected={setIsSelected}
                            questionType = {quizData.data.questions[current_index].questionType}
                        />
                    })}





                </div>
            </div>
            <div className=' w-full h-[136px] shadow-xl flex px-6 flex-row items-center mt-2'>
                <button
                    className="bg-white  text-[#FEC260] px-6 size-fit w-[167px] py-[12px] border border-[#FEC260] rounded-[8px]"
                    onClick={() => cancelHandler()}
                >
                    Cancel
                </button>
                <CircularProgressbar className='h-[74px] w-[74px]' value={30} text='30 mins' />;
                <button disabled={!isSelected} className="bg-[#040BC5] size-fit text-white px-6 py-[12px] w-[167px] rounded-[8px]" onClick={() => selectHandler()}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default MCQPage;