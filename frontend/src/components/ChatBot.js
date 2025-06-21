import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Send, Bot, User, Loader, Copy, ThumbsUp, ThumbsDown, BookOpen, Lightbulb } from 'lucide-react';
import { useChat } from '../hooks/useChat';

const ChatBot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState('');
  
  // Initialize chat with enhanced welcome message
  const initialMessages = [
    { 
      type: 'bot', 
      text: 'Welcome to the GTTC Learning Assistant! 🎓\n\nI\'m your specialized technical training companion with comprehensive knowledge in:\n\n🔧 **Manufacturing Processes** - CNC programming, machining, quality control\n⚡ **Industrial Automation** - PLC programming, SCADA systems, robotics\n🛡️ **Safety Protocols** - LOTO procedures, PPE selection, hazard analysis\n🔨 **Equipment Maintenance** - Preventive, predictive, and reliability-centered maintenance\n📊 **Quality Management** - Six Sigma, ISO standards, measurement techniques\n🏭 **Manufacturing Processes** - Metal cutting, welding, heat treatment\n\nI provide detailed, contextual answers and avoid repetitive responses. How can I help advance your technical knowledge today?',
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
    clearChat,
    loadConversation,
    conversationTitle,
    setConversationTitle
  } = useChat(initialMessages);

  // Handle initial prompt from StudentPrompt component or load existing conversation
  useEffect(() => {
    if (location.state?.initialPrompt) {
      sendMessage(location.state.initialPrompt);
    } else if (location.state?.chatId && location.state?.loadConversation) {
      loadConversation(location.state.chatId);
    }
  }, [location.state, sendMessage, loadConversation]);

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

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear this chat? This will start a new conversation.')) {
      clearChat();
      // Reset to initial welcome message
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  // Enhanced quick prompts with more specific GTTC topics
  const quickPrompts = [
    'Explain CNC G-code programming basics with examples',
    'What are the 6 steps of LOTO procedure?',
    'How does Statistical Process Control (SPC) work?',
    'Describe PLC ladder logic programming fundamentals',
    'What is predictive maintenance and its techniques?',
    'Explain the 8 wastes in lean manufacturing',
    'How do you select appropriate PPE for different hazards?',
    'What is Six Sigma DMAIC methodology?'
  ];

  // Format message text with better structure
  const formatMessageText = (text) => {
    // Convert markdown-style formatting to HTML
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
    
    return { __html: formattedText };
  };

  return (
    <div className="chatbot-container">
      <header className="chat-header">
        <button onClick={() => navigate('/dashboard')} className="back-btn">
          <ArrowLeft size={20} />
        </button>
        <div className="chat-title">
          <Bot size={24} />
          <h2>GTTC Learning Assistant</h2>
          {conversationTitle && (
            <span className="conversation-title">- {conversationTitle}</span>
          )}
        </div>
        <div className="chat-actions">
          <button onClick={handleClearChat} className="clear-btn">
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
                <div dangerouslySetInnerHTML={formatMessageText(msg.text)} />
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
              
              {/* Show metadata for debugging in development */}
              {process.env.NODE_ENV === 'development' && msg.metadata && (
                <div className="message-metadata">
                  <small>Search Results: {msg.metadata.searchResults?.length || 0}</small>
                </div>
              )}
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
                <span>Analyzing your question and searching knowledge base...</span>
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
          <div className="suggestions-header">
            <Lightbulb size={16} />
            <span>Quick Topics:</span>
          </div>
          <div className="suggestions-grid">
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
        </div>
        
        <div className="chat-input">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about GTTC technical training - CNC programming, safety procedures, automation, quality control, maintenance, or manufacturing processes..."
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
          <div className="footer-links">
            <button onClick={() => navigate('/student-prompt')} className="footer-link">
              <BookOpen size={16} />
              Browse Learning Modules
            </button>
          </div>
          <p className="disclaimer">
            GTTC Learning Assistant provides educational information based on technical training curriculum. Always follow official procedures and consult with instructors for practical applications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;