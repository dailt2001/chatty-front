import React, { useState } from 'react';
import './AuthTabs.scss';
// eslint-disable-next-line no-unused-vars
import backgroundImage from '../../../assets/images/background.jpg';
import { Login, Register } from '..';
const AuthTabs = () => {
    const [type, setType] = useState('Sign In');
    return (
        <>
            <div className="container-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="environment">DEV</div>
                <div className="container-wrapper-auth">
                    <div className="tabs">
                        <div className="tabs-auth">
                            <ul className="tab-group">
                                <li className={type === 'Sign In' ? 'tab active' : 'tab'} onClick={() => setType('Sign In')}>
                                    <button className="login">Sign In</button>
                                </li>
                                <li className={type === 'Sign Up' ? 'tab active' : 'tab'} onClick={() => setType('Sign Up')}>
                                    <button className="signup">Sign Up</button>
                                </li>
                            </ul>
                            {type === 'Sign In' && (
                                <div className="tab-item">
                                    <Login />
                                </div>
                            )}
                            {type === 'Sign Up' && (
                                <div className="tab-item">
                                    <Register />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthTabs;
