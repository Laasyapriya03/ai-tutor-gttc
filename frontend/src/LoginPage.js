import React, { useState } from 'react';
import './App.css'; 
//import { useNavigate } from 'react-router-dom';
//import ChatbotUI from './ChatBotUI';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    console.log('Logging in with:', email, password);
    alert('Login successful!');
   // navigate('/chat');
  };

  return (
    <div className="login-page">
      <div className="left-panel">
        <h1>AI - Tutor</h1>
        <p>Welcome back! Enhance your learning with our AI-driven guidance.</p>
      </div>

      <div className="right-panel">
        <div className="login-box">
          <h2>Login to AI Tutor</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="login-button">Login</button>
          </form>

          <div className="divider"><span>or</span></div>

          <div className="social-login">
            <button className="google-login">
              <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" />
              Login with Google
            </button>
            <button className="github-login">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub" />
              Login with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
