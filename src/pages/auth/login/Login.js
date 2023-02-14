import { useState, useEffect } from 'react';
import '@pages/auth/login/Login.scss';
import { FaArrowRight } from 'react-icons/fa';
import { Input, Button } from '@components/index';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '@services/api/auth/auth.service';
import useLocalStorage from '@hooks/useLocalStorage';
import { Utils } from '@services/utils/utils.service';
import useSessionStorage from '@hooks/useSessionStorage';
import { useDispatch } from 'react-redux';

const ForgotPassword = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [user, setUser] = useState('');

    const [setStoredUsername] = useLocalStorage('username', 'set');
    const [setLoggedIn] = useLocalStorage('keepLoggedIn', 'set');
    const [pageReload] = useSessionStorage('pageReload', 'set');

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            setLoggedIn(keepLoggedIn);
            setStoredUsername(username);
            // dispatch user to redux
            Utils.dispatchUser(result, pageReload, dispatch, setUser);

            console.log(result);
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
        if (user) navigate('/app/social/streams');
    }, [loading, navigate, user]);

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
                            value={keepLoggedIn}
                            handleChange={() => setKeepLoggedIn(!keepLoggedIn)}
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
