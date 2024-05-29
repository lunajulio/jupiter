import './login.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';

function Login() {
    const [isLoginActive, setIsLoginActive] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const registerLink = () => {
        setIsLoginActive(false);
    };

    const loginLink = () => {
        setIsLoginActive(true);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            if(response.data.success) {
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('points', response.data.points);
                window.location.href = '/background';
            }
        } catch (error) {
            console.error('Error during login', error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', { email, username, password });
            alert(response.data.message);
            if(response.data.success) {
                loginLink();
            }
        } catch (error) {
            console.error('Error during registration', error);
        }
    };

    return (
        <div className='background'>
            <div className={`wrapper ${isLoginActive ? 'login-active' : 'register-active'}`}>
                <div className="form-box login">
                    <form onSubmit={handleLogin}>
                        <h1>WELCOME TO JUPITER!</h1>
                        <div className='input-box'>
                            <input
                                type="text"
                                placeholder='Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input
                                type="password"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <FaLock className='icon' />
                        </div>

                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" /> Remember me
                            </label>
                            <a href="#">Forgot password?</a>
                        </div>

                        <button type='submit'>Login</button>
                        <div className="register-link">
                            <p>Dont have an account? <a href="#" onClick={registerLink}>Register</a></p>
                        </div>
                    </form>
                </div>

                <div className="form-box register">
                    <form onSubmit={handleRegister}>
                        <h1>Dont be afraid :D</h1>
                        <div className='input-box'>
                            <input
                                type="text"
                                placeholder='Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <FaUser className='icon' />
                        </div>
                        <div className='input-box'>
                            <input
                                type="email"
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <FaEnvelope className='icon' />
                        </div>
                        <div className='input-box'>
                            <input
                                type="password"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <FaLock className='icon' />
                        </div>

                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" /> I accept the terms and conditions
                            </label>
                        </div>

                        <button type='submit'>Register</button>
                        <div className="register-link">
                            <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
