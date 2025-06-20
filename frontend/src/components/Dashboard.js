import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  MessageCircle, 
  BookOpen, 
  History, 
  MessageSquare, 
  LogOut,
  Settings,
  User,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const dashboardItems = [
    {
      title: 'AI Chat Assistant',
      description: 'Get instant help with technical questions and learning guidance',
      icon: MessageCircle,
      path: '/chat',
      color: 'bg-blue-500'
    },
    {
      title: 'Student Prompts',
      description: 'Access curated learning prompts and exercises',
      icon: BookOpen,
      path: '/student-prompt',
      color: 'bg-green-500'
    },
    {
      title: 'Chat History',
      description: 'Review your previous conversations and learning progress',
      icon: History,
      path: '/history',
      color: 'bg-purple-500'
    },
    {
      title: 'Feedback',
      description: 'Provide feedback and suggestions for improvement',
      icon: MessageSquare,
      path: '/feedback',
      color: 'bg-orange-500'
    }
  ];

  const stats = [
    { label: 'Learning Hours', value: '24.5', icon: Clock },
    { label: 'Completed Modules', value: '12', icon: Award },
    { label: 'Progress', value: '78%', icon: TrendingUp }
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="brand">
            <Settings className="brand-icon" size={32} />
            <h1>GTTC Learning Platform</h1>
          </div>
          
          <div className="user-section">
            <div className="user-info">
              <User size={20} />
              <span>Welcome, {user?.name || 'Student'}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-content">
          <section className="welcome-section">
            <h2>Welcome to Your Learning Dashboard</h2>
            <p>Continue your technical education journey with our comprehensive learning tools.</p>
          </section>

          <section className="stats-section">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">
                    <stat.icon size={24} />
                  </div>
                  <div className="stat-content">
                    <h3>{stat.value}</h3>
                    <p>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="modules-section">
            <h3>Learning Modules</h3>
            <div className="modules-grid">
              {dashboardItems.map((item, index) => (
                <div 
                  key={index} 
                  className="module-card"
                  onClick={() => navigate(item.path)}
                >
                  <div className={`module-icon ${item.color}`}>
                    <item.icon size={32} color="white" />
                  </div>
                  <div className="module-content">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="module-arrow">→</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;