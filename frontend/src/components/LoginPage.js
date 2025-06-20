import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Settings, BookOpen, Users, Award } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Both fields are required');
      setLoading(false);
      return;
    }

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }
    
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="left-panel">
        <div className="brand-section">
          <div className="logo-container">
            <Settings className="logo-icon" size={48} />
          </div>
          <h1>GTTC Digital Learning</h1>
          <p className="tagline">Government Tool Room & Training Centre</p>
          <p className="description">
            Enhance your technical skills with our comprehensive digital learning platform. 
            Access expert-guided training materials and interactive learning experiences.
          </p>
        </div>
        
        <div className="features-grid">
          <div className="feature-item">
            <BookOpen size={24} />
            <span>Interactive Learning</span>
          </div>
          <div className="feature-item">
            <Users size={24} />
            <span>Expert Guidance</span>
          </div>
          <div className="feature-item">
            <Award size={24} />
            <span>Skill Certification</span>
          </div>
        </div>
      </div>

      <div className="right-panel">
        <div className="login-box">
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Sign in to continue your learning journey</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="demo-credentials">
            <p><strong>Demo Credentials:</strong></p>
            <p>Email: student@gttc.gov.in</p>
            <p>Password: demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;