import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Star, Send } from 'lucide-react';

const Feedback = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rating: '',
    category: '',
    subject: '',
    message: '',
    suggestions: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds and redirect
    setTimeout(() => {
      setSubmitted(false);
      navigate('/dashboard');
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="feedback-container">
        <div className="feedback-main">
          <div className="success-message">
            <div className="success-icon">
              <Send size={48} color="#10b981" />
            </div>
            <h2>Thank You!</h2>
            <p>Your feedback has been submitted successfully. We appreciate your input and will use it to improve our platform.</p>
            <div className="loading-indicator">
              <div className="spinner"></div>
              <span>Redirecting to dashboard...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-container">
      <header className="prompt-header">
        <div className="prompt-header-content">
          <div className="prompt-title">
            <button onClick={() => navigate('/dashboard')} className="back-btn">
              <ArrowLeft size={20} />
            </button>
            <MessageSquare size={28} color="#f59e0b" />
            <h1>Feedback & Suggestions</h1>
          </div>
        </div>
      </header>

      <main className="feedback-main">
        <div className="feedback-form">
          <h2>Help Us Improve</h2>
          <p>Your feedback is valuable to us. Please share your experience and suggestions to help us enhance the GTTC Learning Platform.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Overall Experience</h3>
              <div className="rating-options">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div key={rating} className="rating-option">
                    <input
                      type="radio"
                      id={`rating-${rating}`}
                      name="rating"
                      value={rating}
                      checked={formData.rating === rating.toString()}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor={`rating-${rating}`}>
                      <Star 
                        size={20} 
                        fill={formData.rating >= rating ? "#fbbf24" : "none"}
                        color="#fbbf24"
                      />
                      {rating}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-section">
              <div className="form-group">
                <label htmlFor="category">Feedback Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="ui-ux">User Interface & Experience</option>
                  <option value="content">Learning Content</option>
                  <option value="chatbot">AI Assistant</option>
                  <option value="performance">Platform Performance</option>
                  <option value="features">New Features</option>
                  <option value="bug">Bug Report</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Brief description of your feedback"
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <div className="form-group">
                <label htmlFor="message">Detailed Feedback</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please provide detailed feedback about your experience..."
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <div className="form-group">
                <label htmlFor="suggestions">Suggestions for Improvement</label>
                <textarea
                  id="suggestions"
                  name="suggestions"
                  value={formData.suggestions}
                  onChange={handleInputChange}
                  placeholder="What features or improvements would you like to see?"
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Submit Feedback
            </button>
          </form>
        </div>

        <div className="feedback-info">
          <div className="info-card">
            <h3>Why Your Feedback Matters</h3>
            <ul>
              <li>Helps us understand user needs better</li>
              <li>Guides our development priorities</li>
              <li>Improves the learning experience for everyone</li>
              <li>Ensures the platform meets industry standards</li>
            </ul>
          </div>
          
          <div className="contact-info">
            <h3>Other Ways to Reach Us</h3>
            <p><strong>Email:</strong> support@gttc.gov.in</p>
            <p><strong>Phone:</strong> +91-XXX-XXX-XXXX</p>
            <p><strong>Office Hours:</strong> Mon-Fri, 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feedback;