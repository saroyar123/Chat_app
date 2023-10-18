import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import your CSS file

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clientHandler = () => {
        dispatch({
            type: "isClient",
            payload: true
        });
        sessionStorage.setItem('role', 'client');

        navigate("/domain");
    }

    const agentHandler = () => {
        sessionStorage.setItem('role', 'agent');
        navigate("/domain");
    }

    return (
        <div className="login-container">
            <h1 className="app-title">FinQuery</h1>
            <div className="button-container">
                <button className="login-button" onClick={clientHandler}>As a Client</button>
                <button className="login-button" onClick={agentHandler}>As an Agent</button>
            </div>
        </div>
    )
}

export default Login;
