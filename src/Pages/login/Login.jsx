import './login.css'
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa'
import { useState } from 'react'

function Login() {
    const [isLoginActive, setIsLoginActive] = useState(true);

    const registerLink = () => {
        setIsLoginActive(false);
    };

    const loginLink = () => {
        setIsLoginActive(true);
    };

    return (
        <div className='background'>
        <div className={`wrapper ${isLoginActive ? 'login-active' : 'register-active'}`}>
            <div className="form-box login">
                <form action="">
                    <h1>WELCOME TO JUPITER!</h1>
                    <div className='input-box'>
                        <input type="text" placeholder='Username' required />
                        <FaUser className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type="password" placeholder='Password' required />
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
                <form action="">
                    <h1>Dont be afraid :D</h1>
                    <div className='input-box'>
                        <input type="text" placeholder='Username' required />
                        <FaUser className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type="email" placeholder='Email' required />
                        <FaEnvelope className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type="password" placeholder='Password' required />
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
    )
}

export default Login;
