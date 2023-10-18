import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Domain.css'; // Import your CSS file

const Domain = () => {
    const { client } = useSelector((state) => state.user);
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

    return (
        <div className="domain-container">
            <h2 className="domain-heading">Choose a Domain:</h2>
            <div className="domain-buttons">
                <button className="domain-button" onClick={() => chooseDomainHandler('Payment')}>
                    Payment
                </button>
                <button className="domain-button" onClick={() => chooseDomainHandler('Loan')}>
                    Loan
                </button>
                <button className="domain-button" onClick={() => chooseDomainHandler('Account')}>
                    Account
                </button>
                <button className="domain-button" onClick={() => chooseDomainHandler('Card')}>
                    ATM Card
                </button>
                <button className="domain-button" onClick={() => chooseDomainHandler('Emi')}>
                    EMI
                </button>
                <button className="domain-button" onClick={() => chooseDomainHandler('others')}>
                    Others
                </button>
            </div>
        </div>
    );
};

export default Domain;
