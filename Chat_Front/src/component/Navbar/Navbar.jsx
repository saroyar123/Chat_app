import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const role = sessionStorage.getItem("role")
    return (
        <div className='navbar'>
            <div className='left-section'>
                <h1>FinQuery</h1>
            </div>
            {
                role == "client" ? <>
                    <div className='right-section'>
                        <Link to='/getAns'>Get Answer</Link>
                    </div>
                </> : <></>
            }
        </div>
    );
};

export default Navbar;