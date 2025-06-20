// API utility functions for GTTC Learning Platform

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('gttc_token');
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('API request failed:', error);
    return { success: false, error: error.message };
  }
};

// Authentication API calls
export const authAPI = {
  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },
  
  refreshToken: async () => {
    return apiRequest('/auth/refresh', {
      method: 'POST',
    });
  },
};

// Chat API calls
export const chatAPI = {
  sendMessage: async (message, conversationId = null) => {
    return apiRequest('/chat/message', {
      method: 'POST',
      body: JSON.stringify({ 
        message, 
        conversation_id: conversationId 
      }),
    });
  },
  
  getConversations: async () => {
    return apiRequest('/chat/conversations');
  },
  
  getConversation: async (conversationId) => {
    return apiRequest(`/chat/conversations/${conversationId}`);
  },
  
  deleteConversation: async (conversationId) => {
    return apiRequest(`/chat/conversations/${conversationId}`, {
      method: 'DELETE',
    });
  },
};

// Feedback API calls
export const feedbackAPI = {
  submitFeedback: async (feedbackData) => {
    return apiRequest('/feedback', {
      method: 'POST',
      body: JSON.stringify(feedbackData),
    });
  },
  
  getFeedbackHistory: async () => {
    return apiRequest('/feedback/history');
  },
};

// Learning prompts API calls
export const promptsAPI = {
  getPrompts: async () => {
    return apiRequest('/prompts');
  },
  
  getPromptsByCategory: async (category) => {
    return apiRequest(`/prompts/category/${category}`);
  },
  
  createCustomPrompt: async (promptData) => {
    return apiRequest('/prompts/custom', {
      method: 'POST',
      body: JSON.stringify(promptData),
    });
  },
};

// User profile API calls
export const userAPI = {
  getProfile: async () => {
    return apiRequest('/user/profile');
  },
  
  updateProfile: async (profileData) => {
    return apiRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
  
  getProgress: async () => {
    return apiRequest('/user/progress');
  },
};

// Analytics API calls
export const analyticsAPI = {
  trackEvent: async (eventName, eventData) => {
    return apiRequest('/analytics/event', {
      method: 'POST',
      body: JSON.stringify({ 
        event_name: eventName, 
        event_data: eventData 
      }),
    });
  },
  
  getLearningStats: async () => {
    return apiRequest('/analytics/learning-stats');
  },
};

// Error handling utility
export const handleAPIError = (error) => {
  if (error.includes('401')) {
    // Unauthorized - redirect to login
    localStorage.removeItem('gttc_token');
    localStorage.removeItem('gttc_user');
    window.location.href = '/login';
  }
  
  return {
    message: 'An error occurred. Please try again.',
    details: error,
  };
};

// Request interceptor for token refresh
export const setupAPIInterceptors = () => {
  // This would be implemented with axios interceptors in a real application
  // For now, we'll handle token refresh manually in components
};

export default {
  authAPI,
  chatAPI,
  feedbackAPI,
  promptsAPI,
  userAPI,
  analyticsAPI,
  handleAPIError,
};