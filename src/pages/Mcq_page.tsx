import React, { useState } from 'react';
import MCQItem from '../components/MCQItem';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { submitQuiz } from '../features/quizSlice';

const MCQPage = () => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [current_index, setCurrentIndex] = useState(0);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    // Create a state to store all answers
    const [selectedAnswers, setSelectedAnswers] = useState<Array<{questionId: string, answer: string}>>([]);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { quizData, quizStatus, quizError } = useSelector((state) => state.quiz);
    const totalQuestions = quizData.data.totalQuestions;

    const handleAnswerSelection = (answer: string) => {
        const newAnswer = {
            questionId: quizData.data.questions[current_index]._id,
            answer: answer
        };

        setSelectedAnswers(prev => {
            // Check if an answer for this question already exists
            const exists = prev.findIndex(a => a.questionId === newAnswer.questionId);
            if (exists !== -1) {
                // Replace the existing answer
                const updated = [...prev];
                updated[exists] = newAnswer;
                return updated;
            }
            // Add new answer
            return [...prev, newAnswer];
        });
    };

    const selectHandler = () => {
        if (current_index < totalQuestions - 1) {
            setCurrentIndex(current_index + 1);
            setIsDisabled(false);
            setIsSelected(false);
        } else {
            // All questions answered, you can now submit
            console.log('All answers:', selectedAnswers);
            dispatch(submitQuiz({moduleId: '', body: selectedAnswers}))
            // Add your submit logic here
        }
    };

    const cancelHandler = () => {
        navigate(-1);
    };   

    let percentage = ((current_index / totalQuestions) * 100);
       
    return (
        <div className='h-[100vh] flex flex-col items-center '>
            {/* ... other JSX ... */}
            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4 h-100 w-160 mx-auto text-center'>
                {quizData.data.questions[current_index].options.map((answer, index) => {
                    return <MCQItem
                        key={index}
                        content={answer}
                        correct={quizData.data.questions[current_index].correctAnswer === answer}
                        isDisabled={isDisabled}
                        setIsDisabled={setIsDisabled}
                        onSelect={() => {
                            handleAnswerSelection(answer);
                            setIsSelected(true);
                        }}
                        isSelected={isSelected}
                        setIsSelected={setIsSelected}
                        questionType={quizData.data.questions[current_index].questionType}
                    />
                })}
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