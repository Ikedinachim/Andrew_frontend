import React, { useState } from 'react';
import MCQItem from '../components/MCQItem';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizReport, resetReportStatus } from '../features/reportSlice';
import LoadingPage from './LoadingPage';
import Swal from 'sweetalert2';
import { resetquizSubmitStatus, submitQuiz } from '../features/submitQuizSlice';
import CountdownTimer from '../components/CountDownTimer';

const MCQPage = () => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [current_index, setCurrentIndex] = useState(0);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    // Create a state to store all answers
    const [selectedAnswers, setSelectedAnswers] = useState<Array<{ questionId: string, answer: string }>>([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { quizData, quizStatus, quizError } = useSelector((state) => state.quiz);
    const { quizSubmitData, quizSubmitStatus, quizSubmitError } = useSelector((state) => state.quizSubmit);
    const { reportData, reportStatus, reportError } = useSelector((state) => state.report);
    const { course, status, error } = useSelector((state) => state.courseDetail);
    let quiz_id = ''

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
    const handleQuizSubmission = async () => {
        try {
            quiz_id = quizData.data._id
            window.localStorage.setItem('quiz_id', quiz_id)
            await dispatch(submitQuiz({ quizId: quizData.data._id, body: { userAnswers: selectedAnswers } }));
            // setTimeout(() => {
            //     dispatch(getQuizReport(window.localStorage.getItem('quiz_id')));

            // }, 3000)

            // Only get the report after submission is complete

        } catch (error) {
            // Handle any errors
            console.error('Error submitting quiz:', error);
        }
    };





    const cancelHandler = () => {
        navigate(-1);
    };
    if (quizStatus == 'idle' || quizStatus == 'loading') {
        return <LoadingPage content='Loading Quiz' />
    }

    if (quizSubmitStatus == 'loading') {
        return <LoadingPage content='Submitting Quiz' />
    }
    const totalQuestions = quizData.data.totalQuestions;
    let percentage = ((current_index / totalQuestions) * 100);
    const selectHandler = () => {
        if (current_index < totalQuestions - 1) {
            setCurrentIndex(current_index + 1);
            setIsDisabled(false);
            setIsSelected(false);
        } else {
            // All questions answered, you can now submit
            // Add your submit logic here

            handleQuizSubmission();
            console.log('done');

        }
    };
    console.log(quizStatus);

    if (quizSubmitStatus == 'success') {
        console.log(quizSubmitData);
        Swal.fire({
            title: 'Quiz Overview',
            text: `On Your ${quizSubmitData.data.attemptNumber} Attempt, Your Scored ${quizSubmitData.data.obtainedMarks}/${quizSubmitData.data.totalQuestions} - ${quizSubmitData.data.percentage} `,
            icon: 'info',
            showCancelButton: false,
            confirmButtonColor: '#D42953',
            cancelButtonColor: '#666666',
            confirmButtonText: 'Done',
            background: '#ffffff',
            backdrop: `rgba(0,0,0,0.4)`,
            customClass: {
                container: 'blur-background'
            }
        }).then((result) => {
            console.log(quizSubmitData.data);

            dispatch(resetquizSubmitStatus())
            dispatch(resetReportStatus())
            if (result.isConfirmed) {
                dispatch(getQuizReport(window.localStorage.getItem('quiz_id')));
                navigate(`/dashboard/quiz-performance-report/${window.localStorage.getItem('quiz_id')}`);
            }
        })
    }
    return (
        <div className='h-[100vh] flex flex-col items-center '>

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
                            handleAnswerSelection(answer);
                            setIsSelected(true);
                        }}
                        isSelected={isSelected}
                        setIsSelected={setIsSelected}
                        questionType={quizData.data.questions[current_index].questionType}
                    />
                })}
            </div>
            <div className=' w-full h-[136px] shadow-xl flex px-6 flex-row items-center justify-between mt-2'>
                <button
                    className="bg-white  text-[#FEC260] px-6 size-fit w-[167px] py-[12px] border border-[#FEC260] rounded-[8px]"
                    onClick={() => cancelHandler()}
                >
                    Cancel
                </button>
                {(quizData.data.timeLimit    || false )&& <CountdownTimer
                    startTime={quizData.data.timeLimit * 60 || 30}
                    onExpire={() => {
                        console.log('Time expired!');
                        alert('Your countdown has ended!');
                        handleQuizSubmission()

                    }} />}
                <button disabled={!isSelected} className="bg-[#040BC5] size-fit text-white px-6 py-[12px] w-[167px] rounded-[8px]" onClick={() => selectHandler()}>
                    Next
                </button>
            </div>
        </div>
    );
};
export default MCQPage;