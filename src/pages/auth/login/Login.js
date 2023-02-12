import { useState, useEffect } from 'react';
import './Login.scss';
import { FaArrowRight } from 'react-icons/fa';
import { Input, Button } from '../../../components';
import { Link } from 'react-router-dom';
import { authService } from '../../../services/api/auth/auth.service';

const ForgotPassword = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [keepLogIn, setKeepLogIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [user, setUser] = useState('');

    const loginUser = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const result = await authService.SignIn({
                username,
                password
            });
            // set logged in to true in local storage
            // set username in local storage
            // dispatch user to redux
            console.log(result);
            setUser(result.data.user);
            setKeepLogIn(keepLogIn);
            setAlertType('alert-success');
            setHasError(false);
        } catch (error) {
            setLoading(false);
            setHasError(true);
            setAlertType('alert-error');
            setErrorMessage(error?.response?.data.message);
        }
    };

    useEffect(() => {
        if (loading && !user) return;
        if (user) {
            setLoading(false);
            console.log('navigate to streams page');
        }
    }, [loading, user]);

    return (
        <div className="auth-inner" onSubmit={loginUser}>
            {hasError && errorMessage && (
                <div className={`alerts ${alertType}`} role="alert">
                    {errorMessage}
                </div>
            )}
            <form className="auth-form">
                <div className="form-input-container">
                    <Input
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        labelText="Username"
                        placeholder="Enter username"
                        handleChange={(e) => setUsername(e.target.value)}
                    />

                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        labelText="Password"
                        placeholder="Enter password"
                        style={{ border: `${hasError ? '1px solid fa9b8a' : ''}` }}
                        handleChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="checkmark-container" htmlFor="checkbox">
                        <Input
                            id="checkbox"
                            name="checkbox"
                            type="checkbox"
                            value={keepLogIn}
                            handleChange={() => setKeepLogIn(!keepLogIn)}
                        />
                        Keep me signed in
                    </label>
                </div>
                <Button
                    label={`${loading ? 'LOGIN IN PROGRESS...' : 'LOGIN'}`}
                    className="auth-button button"
                    disabled={!username || !password}
                />
                <Link to={'/forgot-password'}>
                    <span className="forgot-password">
                        Forgot password? <FaArrowRight className="arrow-right" />
                    </span>
                </Link>
            </form>
        </div>
    );
};

export default ForgotPassword;
