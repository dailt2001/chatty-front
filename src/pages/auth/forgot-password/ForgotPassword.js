import { useState } from 'react';
import '@pages/auth/forgot-password/ForgotPassword.scss';
import { FaArrowLeft } from 'react-icons/fa';
import { Input, Button } from '@components/index';
import backgroundImage from '@assets/images/background.jpg';
import { Link } from 'react-router-dom';
import { authService } from '@services/api/auth/auth.service';

const Login = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [responseMessage, setResponseMessage] = useState('');

    const forgotPassword = async (event) => {
        setLoading(true);
        event.preventDefault();
        try {
            const response = await authService.forgotPassword(email);
            setLoading(false);
            setEmail('');
            setShowAlert(false);
            setAlertType('alert-success');
            setResponseMessage(response?.data?.mes);
            console.log(response);
        } catch (error) {
            setAlertType('alert-error');
            setLoading(false);
            setShowAlert(true);
            setResponseMessage(error?.response?.data?.message);
        }
    };
    return (
        <div className="container-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="container-wrapper-auth">
                <div className="tabs forgot-password-tabs" style={{ height: `${responseMessage ? '300px' : ''}` }}>
                    <div className="tabs-auth">
                        <ul className="tab-group">
                            <li className="tab">
                                <div className="login forgot-password">Forgot Password</div>
                            </li>
                        </ul>

                        <div className="tab-item">
                            <div className="auth-inner">
                                {responseMessage && (
                                    <div className={`alerts ${alertType}`} role="alert">
                                        {responseMessage}
                                    </div>
                                )}
                                <form className="forgot-password-form" onSubmit={forgotPassword}>
                                    <div className="form-input-container">
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={email}
                                            labelText="Email"
                                            placeholder="Enter email"
                                            style={{ border: `${showAlert ? '1px solid #fa9b8a' : ''}` }}
                                            handleChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <Button
                                        label={`${loading ? 'FORGOT PASSWORD IN PROGRESS...' : 'FORGOT PASSWORD'}`}
                                        className="auth-button button"
                                        disabled={!email}
                                    />{' '}
                                    <Link to={'/'}>
                                        <span className="login">
                                            <FaArrowLeft className="arrow-left" /> Back To Login
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

export default Login;
