import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Send, Bot, User, Loader, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useChat } from '../hooks/useChat';

const ChatBot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState('');
  
  // Initialize chat with welcome message
  const initialMessages = [
    { 
      type: 'bot', 
      text: 'Hello! I\'m your GTTC Learning Assistant. I specialize in technical training topics including manufacturing, automation, safety protocols, and quality control. How can I help you learn today?',
      timestamp: new Date(),
      id: 1
    }
  ];

  const {
    messages,
    isLoading,
    error,
    messagesEndRef,
    sendMessage,
    clearChat
  } = useChat(initialMessages);

  // Handle initial prompt from StudentPrompt component
  useEffect(() => {
    if (location.state?.initialPrompt) {
      sendMessage(location.state.initialPrompt);
    }
  }, [location.state, sendMessage]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    await sendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickPrompt = (promptText) => {
    setInput(promptText);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const quickPrompts = [
    'Explain CNC programming basics',
    'What are industrial safety protocols?',
    'How does quality control work?',
    'Tell me about PLC programming',
    'Preventive maintenance procedures'
  ];

  return (
    <div className="chatbot-container">
      <header className="chat-header">
        <button onClick={() => navigate('/dashboard')} className="back-btn">
          <ArrowLeft size={20} />
        </button>
        <div className="chat-title">
          <Bot size={24} />
          <h2>GTTC Learning Assistant</h2>
        </div>
        <div className="chat-actions">
          <button onClick={clearChat} className="clear-btn">
            Clear Chat
          </button>
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span>Online</span>
          </div>
        </div>
      </header>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.type === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-avatar">
              {msg.type === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            <div className="message-content">
              <div className={`message-text ${msg.isError ? 'error-message' : ''}`}>
                {msg.text}
              </div>
              <div className="message-footer">
                <div className="message-time">{formatTime(msg.timestamp)}</div>
                {msg.type === 'bot' && !msg.isError && (
                  <div className="message-actions">
                    <button 
                      onClick={() => copyToClipboard(msg.text)}
                      className="action-btn"
                      title="Copy message"
                    >
                      <Copy size={14} />
                    </button>
                    <button className="action-btn" title="Helpful">
                      <ThumbsUp size={14} />
                    </button>
                    <button className="action-btn" title="Not helpful">
                      <ThumbsDown size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message bot-message">
            <div className="message-avatar">
              <Bot size={20} />
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <Loader className="spinner" size={16} />
                <span>Assistant is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="error-notification">
            <p>Error: {error}</p>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <div className="quick-suggestions">
          {quickPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleQuickPrompt(prompt)}
              className="quick-prompt-btn"
            >
              {prompt}
            </button>
          ))}
        </div>
        
        <div className="chat-input">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about technical training, manufacturing, safety, or automation..."
            rows="1"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="send-btn"
          >
            <Send size={20} />
          </button>
        </div>
        
        <div className="chat-footer">
          <p className="disclaimer">
            GTTC Learning Assistant provides educational information. Always follow official procedures and consult with instructors for practical applications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;