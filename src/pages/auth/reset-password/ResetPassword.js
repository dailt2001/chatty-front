import React from 'react';
import backgroundImage from '@assets/images/background.jpg';
import '@pages/auth/reset-password/ResetPassword.scss';
import { Input, Button } from '@components/index';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ResetPassword = () => {
    return (
        <div className="container-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="environment">DEV</div>
            <div className="container-wrapper-auth">
                <div className="tabs reset-password-tabs">
                    <div className="tabs-auth">
                        <ul className="tab-group">
                            <li className="tab">
                                <div className="login reset-password">Reset Password</div>
                            </li>
                        </ul>
                        <div className="tab-item">
                            <div className="auth-inner">
                                <form className="reset-password-form">
                                    <div className="form-input-container">
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value=""
                                            labelText="New Password"
                                            placeholder="New Password"
                                            handleChange={() => {}}
                                        />
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value=""
                                            labelText="Confirm Password"
                                            placeholder="Confirm Password"
                                            handleChange={() => {}}
                                        />
                                    </div>
                                    <Button label="RESET PASSWORD" className="auth-button button" disabled={false} />

                                    <Link to={'/'}>
                                        <span className="login">
                                            <FaArrowLeft className="arrow-left" /> Back to Login
                                        </span>
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
