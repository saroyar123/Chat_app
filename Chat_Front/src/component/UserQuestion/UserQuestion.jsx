import axios from 'axios';
import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import "./UserQuestion.css"

const UserQuestion = () => {
    const [userId, setUserId] = useState("");
    const [data, setData] = useState({
        success: false,
        Question: null
    })

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:4000/api/v1/getAns", { userId });
        setData(response.data)
    }

    return (
        <div>
            <Navbar />
            <div className='user-question-container'>
                <form onSubmit={submitHandler} className='form-question-container'>
                    <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder='Enter your user id' />
                    <button type='submit'>Enter</button>
                </form>
                {
                    data.success ? <>
                        {
                            data.Question.map((value) => (
                                <div className='all-question-container'>

                                    <h1>{value.messageBody}</h1>
                                    {
                                        value.ans === "" ? 
                                        <h2 className='question-not-answer'>Not answered yet</h2> : 
                                        <h2 className='question-answered'>{value.ans}</h2>
                                    }


                                </div>

                            ))
                        }
                    </> : <></>
                }
            </div>
            <Footer />
        </div >
    )
}

export default UserQuestion