import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, History, Search, MessageCircle, Clock, Filter } from 'lucide-react';

const ChatHistory = () => {
  const navigate = useNavigate();
  const [chatHistory, setChatHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all'
  });

  // Load chat history from localStorage
  useEffect(() => {
    const loadChatHistory = () => {
      try {
        const savedHistory = localStorage.getItem('gttc_chat_history');
        if (savedHistory) {
          const parsedHistory = JSON.parse(savedHistory);
          setChatHistory(parsedHistory);
          setFilteredHistory(parsedHistory);
        } else {
          // If no history exists, show empty state
          setChatHistory([]);
          setFilteredHistory([]);
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
        setChatHistory([]);
        setFilteredHistory([]);
      }
    };

    loadChatHistory();
  }, []);

  useEffect(() => {
    let filtered = chatHistory;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(chat =>
        chat.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        chat.preview.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(chat => chat.category === filters.category);
    }

    setFilteredHistory(filtered);
  }, [filters, chatHistory]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChatClick = (chatId) => {
    // Load the specific chat conversation
    navigate('/chat', { state: { chatId, loadConversation: true } });
  };

  const clearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear all chat history? This action cannot be undone.')) {
      localStorage.removeItem('gttc_chat_history');
      setChatHistory([]);
      setFilteredHistory([]);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Manufacturing': 'bg-blue-500',
      'Safety': 'bg-red-500',
      'Quality': 'bg-green-500',
      'Automation': 'bg-purple-500',
      'Maintenance': 'bg-orange-500',
      'General': 'bg-gray-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="history-container">
      <header className="prompt-header">
        <div className="prompt-header-content">
          <div className="prompt-title">
            <button onClick={() => navigate('/dashboard')} className="back-btn">
              <ArrowLeft size={20} />
            </button>
            <History size={28} color="#8b5cf6" />
            <h1>Chat History</h1>
          </div>
          {chatHistory.length > 0 && (
            <button onClick={clearAllHistory} className="clear-all-btn">
              Clear All History
            </button>
          )}
        </div>
      </header>

      <main className="history-main">
        <div className="history-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="search">
                <Search size={16} />
                Search
              </label>
              <input
                type="text"
                id="search"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search conversations..."
              />
            </div>

            <div className="filter-group">
              <label htmlFor="category">
                <Filter size={16} />
                Category
              </label>
              <select
                id="category"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="all">All Categories</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Safety">Safety</option>
                <option value="Quality">Quality</option>
                <option value="Automation">Automation</option>
                <option value="Maintenance">Maintenance</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>
        </div>

        {chatHistory.length > 0 && (
          <div className="history-summary">
            <div className="summary-stats">
              <div className="stat-item">
                <MessageCircle size={20} />
                <span>{filteredHistory.length} Conversations</span>
              </div>
              <div className="stat-item">
                <Clock size={20} />
                <span>{filteredHistory.reduce((total, chat) => total + parseInt(chat.duration), 0)} min total</span>
              </div>
            </div>
          </div>
        )}

        <div className="history-list">
          {filteredHistory.length === 0 ? (
            <div className="no-results">
              <History size={48} color="#94a3b8" />
              <h3>{chatHistory.length === 0 ? 'No chat history yet' : 'No conversations found'}</h3>
              <p>
                {chatHistory.length === 0 
                  ? 'Start a conversation with the AI assistant to see your chat history here.'
                  : 'Try adjusting your search criteria or start a new conversation.'
                }
              </p>
              <button 
                onClick={() => navigate('/chat')}
                className="start-chat-btn"
              >
                Start New Chat
              </button>
            </div>
          ) : (
            filteredHistory.map((chat) => (
              <div
                key={chat.id}
                className="history-item"
                onClick={() => handleChatClick(chat.id)}
              >
                <div className="history-header">
                  <div className="chat-title">
                    <h3>{chat.title}</h3>
                    <span className={`category-badge ${getCategoryColor(chat.category)}`}>
                      {chat.category}
                    </span>
                  </div>
                </div>
                
                <div className="history-preview">
                  {chat.preview}
                </div>
                
                <div className="history-stats">
                  <span>{chat.messageCount} messages</span>
                  <span>{chat.duration}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ChatHistory;