import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Domain.css'; // Import your CSS file
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';

const Domain = () => {
    const { client } = useSelector((state) => state.user);
    const [data,setData]=useState(null)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const chooseDomainHandler = (domain) => {
        dispatch({
            type: 'setDomain',
            payload: domain,
        });
        sessionStorage.setItem('domain', domain);
        navigate('/question');
    };

    useEffect(()=>{
        axios.get("http://localhost:4000/api/v1/activeQues")
        .then((response)=>{
            setData(response.data)
            console.log(data)
        })
        .catch((err)=>{
          alert(err.message)
        })

        
    },[])

    return (
        <div>
            <Navbar/>
             <div className="domain-container">
            <h2 className="domain-heading">Choose a Domain:</h2>
            <div className="domain-buttons">
                {
                    data==null?<h1>Loading...</h1>:<>
                    {
                        data.questionMap.map((value)=>(
                            <div className='domain-and-number'>
                                <button  className="domain-button" onClick={() => chooseDomainHandler(value[0])}>{value[0]}</button>
                                <h3>Active Question {value[1]}</h3>
                            </div>
                        ))
                    }
                    </>
                }
            </div>
        </div>
        <Footer/>
        </div>
       
    );
};

export default Domain;
