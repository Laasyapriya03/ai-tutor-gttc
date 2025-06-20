import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, History, Search, Calendar, MessageCircle, Clock, Filter } from 'lucide-react';

const ChatHistory = () => {
  const navigate = useNavigate();
  const [chatHistory, setChatHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    dateFrom: '',
    dateTo: '',
    category: 'all'
  });

  // Mock chat history data
  useEffect(() => {
    const mockHistory = [
      {
        id: 1,
        date: new Date('2024-01-15'),
        title: 'CNC Programming Basics',
        preview: 'Discussed G-code fundamentals and coordinate systems for CNC machining...',
        category: 'Manufacturing',
        messageCount: 12,
        duration: '25 min'
      },
      {
        id: 2,
        date: new Date('2024-01-14'),
        title: 'Safety Protocols in Workshop',
        preview: 'Learned about lockout/tagout procedures and personal protective equipment...',
        category: 'Safety',
        messageCount: 8,
        duration: '18 min'
      },
      {
        id: 3,
        date: new Date('2024-01-13'),
        title: 'Quality Control Methods',
        preview: 'Explored statistical process control and measurement techniques...',
        category: 'Quality',
        messageCount: 15,
        duration: '32 min'
      },
      {
        id: 4,
        date: new Date('2024-01-12'),
        title: 'PLC Programming Introduction',
        preview: 'Introduction to ladder logic and basic PLC programming concepts...',
        category: 'Automation',
        messageCount: 20,
        duration: '45 min'
      },
      {
        id: 5,
        date: new Date('2024-01-11'),
        title: 'Preventive Maintenance',
        preview: 'Discussed maintenance scheduling and equipment care procedures...',
        category: 'Maintenance',
        messageCount: 10,
        duration: '22 min'
      }
    ];
    
    setChatHistory(mockHistory);
    setFilteredHistory(mockHistory);
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

    // Date filters
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      filtered = filtered.filter(chat => chat.date >= fromDate);
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      filtered = filtered.filter(chat => chat.date <= toDate);
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
    // In a real app, you would load the specific chat conversation
    navigate('/chat', { state: { chatId } });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Manufacturing': 'bg-blue-500',
      'Safety': 'bg-red-500',
      'Quality': 'bg-green-500',
      'Automation': 'bg-purple-500',
      'Maintenance': 'bg-orange-500'
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
              <label htmlFor="dateFrom">
                <Calendar size={16} />
                From Date
              </label>
              <input
                type="date"
                id="dateFrom"
                name="dateFrom"
                value={filters.dateFrom}
                onChange={handleFilterChange}
              />
            </div>

            <div className="filter-group">
              <label htmlFor="dateTo">To Date</label>
              <input
                type="date"
                id="dateTo"
                name="dateTo"
                value={filters.dateTo}
                onChange={handleFilterChange}
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
              </select>
            </div>
          </div>
        </div>

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

        <div className="history-list">
          {filteredHistory.length === 0 ? (
            <div className="no-results">
              <History size={48} color="#94a3b8" />
              <h3>No conversations found</h3>
              <p>Try adjusting your search criteria or start a new conversation.</p>
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
                  <div className="history-date">
                    {formatDate(chat.date)}
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