import './Register.scss';
import { Input, Button } from '../../../components';
import { useState, useEffect } from 'react';
import { Utils } from '../../../services/utils/utils.service';
import { authService } from '../../../services/api/auth/auth.service';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [hasError, setHasError] = useState(false);
    const [user, setUser] = useState('');

    const registerUser = async (event) => {
        setLoading(true);
        event.preventDefault();
        try {
            const avatarColor = Utils.avatarColor();
            const avatarImage = Utils.generateAvatar(username.charAt(0).toUpperCase(), avatarColor);
            const result = await authService.SignUp({
                username,
                email,
                password,
                avatarColor,
                avatarImage
            });
            console.log(result);
            // set logged in to true in local storage
            // set username in local storage
            // dispatch user to redux
            setUser(result.data.user);
            setAlertType('alert-success');
            setHasError(false);
        } catch (error) {
            setLoading(false);
            setHasError(true);
            setAlertType('alert-error');
            setErrorMessage(error?.response?.data.message); // from axios
        }
    };

    useEffect(() => {
        if (loading && !user) return; // sign up failed
        if (user) {
            console.log('navigate to streams page');
            setLoading(false);
        }
    }, [loading, user]);

    return (
        <div className="auth-inner">
            {hasError && errorMessage && (
                <div className={`alerts ${alertType}`} role="alert">
                    {errorMessage}
                </div>
            )}
            <form className="auth-form" onSubmit={registerUser}>
                <div className="form-input-container">
                    <Input
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        labelText="Username"
                        placeholder="Enter username"
                        style={{ border: `${hasError ? '1px solid fa9b8a' : ''}` }}
                        handleChange={(e) => setUsername(e.target.value)}
                    />

                    <Input
                        id="email"
                        name="email"
                        type="text"
                        value={email}
                        labelText="Email"
                        placeholder="Enter email"
                        style={{ border: `${hasError ? '1px solid fa9b8a' : ''}` }}
                        handleChange={(e) => setEmail(e.target.value)}
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
                </div>
                <Button
                    label={`${loading ? 'SIGNUP IN PROGRESS...' : 'SIGN UP'}`}
                    className="auth-button button"
                    disabled={!username || !email || !password}
                />
            </form>
        </div>
    );
};

export default Register;
