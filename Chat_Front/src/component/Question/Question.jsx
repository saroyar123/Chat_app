import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getQuestionAction, similarQuestionAction } from '../../action/questionAction';
import './Question.css'; // Import your CSS file
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Question = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [ans, setAns] = useState('');
    const [ansSubmit, setAnsSubmit] = useState(1)
    const [questionInfo, setQuestionInfo] = useState({});
    const [askQuestion, setAskQuestion] = useState("")
    const [userId, setUserId] = useState("")
    const dispatch = useDispatch();
    const [client, setClient] = useState("")
    const [rerender, setRerender] = useState(1)
    const [success, setSuccess] = useState(1);
    const { loading, data } = useSelector((state) => state.question);
    const { data: simiData, loading: simiLoading } = useSelector((state) => state.similarQuestion)
    const domain = sessionStorage.getItem("domain");
    useEffect(() => {
        setClient(sessionStorage.getItem("role"))

        console.log(domain, client)
        dispatch(getQuestionAction(domain));
    }, [dispatch, getQuestionAction]);

    const submitHandler = async () => {
        console.log(questionInfo)
        const response = await axios.post("https://chat-app-backend-k0z2.onrender.com/api/v1/question", { answer: ans, id: questionInfo._id });
        if (response.data.success === true) {
            setAnsSubmit(2)
        }
        else {
            setAnsSubmit(3);
        }

        dispatch(getQuestionAction(domain));

    };

    const askQuestioHandler = async (e) => {
        e.preventDefault();
        setSuccess(2);
        const response = await axios.post("https://chat-app-backend-k0z2.onrender.com/api/v1/addQuestion", { userId, askQuestion });
        console.log(response)
        if (response.data.success == true)
            setSuccess(3);
        else
            setSuccess(4);


    }

    const openDialogHandler = (value) => {
        setOpenDialog(true);
        setQuestionInfo({ ...value });
        console.log(questionInfo);
    };

    const closeDialogHandler = () => {
        setOpenDialog(false);
        setQuestionInfo({});
        setAnsSubmit(1);
        setAns("")
    };

    return (
        <div>
            <Navbar />

            <div className="question-container">
                {loading ? (
                    <h1>Loading</h1>
                ) : (
                    <>
                        {data != null ? (
                            <>
                                <ShowQuestion data={data.data.notAnsQuestion} openDialogHandler={openDialogHandler} typeQuestion={"Not Answer Questions"} />
                                <ShowQuestion data={data.data.ansQuestion} openDialogHandler={openDialogHandler} typeQuestion={"Answer Questions"} />
                            </>

                        ) : (
                            <></>
                        )
                        }
                        <>
                            {client === "client" ? (
                                <div className='ask-question-container'>
                                    {success > 2 ? success === 3 ? <>
                                        <button onClick={() => {
                                            setSuccess(1);
                                            setUserId("");
                                            setAskQuestion("");
                                        }
                                        } className="submit-button">Ask Again</button>
                                        <h1>Your question is added</h1>
                                    </> :
                                        <>
                                            <button onClick={() => {
                                                setSuccess(1);
                                                setUserId("");
                                                setAskQuestion("");
                                            }} className="submit-button">Try Again</button>
                                            <h1>Somethig i wrong</h1>
                                        </>
                                        : <>
                                            <h1>Ask Your Question</h1>
                                            <form className='ask-Question-from' onSubmit={askQuestioHandler}>
                                                <input className="question-input" placeholder='Enter your id' value={userId} onChange={(e) => setUserId(e.target.value)} />
                                                <textarea
                                                    className="answer-input"
                                                    placeholder='Wright your question'
                                                    value={askQuestion}
                                                    onChange={(e) => {
                                                        setAskQuestion(e.target.value)
                                                        dispatch(similarQuestionAction(askQuestion))
                                                    }} />
                                                <button type='submit' className="submit-button">Ask</button>
                                            </form>
                                            <div className='similar-questions'>
                                                {
                                                    simiData != null ? <>
                                                        {simiLoading ? <h1>Loading...</h1> :
                                                            <>
                                                                {
                                                                    simiData.success ? <>
                                                                        {
                                                                            simiData.similarQuestion.slice(0, Math.min(5, simiData.similarQuestion.length)).map((value, index) => (
                                                                                <h2>{value}</h2>
                                                                            ))
                                                                        }
                                                                    </> : <></>
                                                                }
                                                            </>
                                                        }
                                                    </> : <></>
                                                }

                                            </div>
                                        </>}
                                </div>

                            ) : (
                                <></>
                            )}
                        </>
                        <Dialog onClose={closeDialogHandler} open={openDialog}>
                            <div >
                                {
                                    ansSubmit === 1 ? <>
                                        <h2 className='dialog-question-container'>{questionInfo.messageBody}</h2>
                                        {
                                            questionInfo.ans === "" ? (client !== "client" ?
                                                <>
                                                    <form onSubmit={(e) => {
                                                        e.preventDefault();
                                                        submitHandler()
                                                        setRerender(rerender => rerender + 1)
                                                    }
                                                    }
                                                        className='dialog-form-container'>
                                                        <textarea
                                                            className="answer-input"
                                                            placeholder='Give your answer'
                                                            value={ans}
                                                            onChange={(e) => setAns(e.target.value)} />
                                                        <button type='submit' className="submit-button">Submit</button>
                                                    </form>
                                                </> :
                                                <>
                                                    <h4 className='dialog-answer-container'>Answer will be update</h4>
                                                </>)
                                                :
                                                <>
                                                    <div className='dialog-answer-container'>
                                                        <h4>Answer of the question</h4>
                                                        <h2>{questionInfo.ans}</h2>
                                                    </div>

                                                </>

                                        }
                                    </> :
                                        <>
                                            {
                                                ansSubmit === 2 ?
                                                    <div className='submit-container'>
                                                        <button onClick={closeDialogHandler} >Answer Another</button>
                                                        <h1>Answer submited</h1>
                                                    </div> :
                                                    <div className='submit-container'>
                                                        <button onClick={closeDialogHandler} >Try Again</button>
                                                        <h1>Something is worng</h1>
                                                    </div>
                                            }
                                        </>
                                }


                            </div>
                        </Dialog>
                    </>
                )}
            </div>
            <Footer />
        </div>

    );
};

export default Question;


const ShowQuestion = ({ data, openDialogHandler, typeQuestion }) => {
    return (
        <>
            {data.length === 0 ? (
                <h1>No questions for this domain</h1>
            ) : (
                <>

                    <InputLabel id="dropdown-label">{typeQuestion}</InputLabel>
                    <FormControl className="question-dropdown" >

                        <Select>
                            {data.map((value, index) => (
                                <MenuItem key={index}>
                                    <button
                                        key={index}
                                        onClick={() => openDialogHandler(value)}
                                        className="question-content-button"
                                    >
                                        <h3>{value.messageBody}</h3>
                                    </button>
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </>)}
        </>
    )
}
