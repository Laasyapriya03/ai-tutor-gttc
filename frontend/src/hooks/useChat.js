import { useState, useCallback, useRef, useEffect } from 'react';
import { searchDatabase, generateContextualResponse, ResponseIntelligence } from '../data/learningDatabase';

// Initialize response intelligence system
const responseIntelligence = new ResponseIntelligence();

// Custom hook for managing chat functionality
export const useChat = (initialMessages = []) => {
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [conversationTitle, setConversationTitle] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Save conversation to history
  const saveConversationToHistory = useCallback((messages, title) => {
    if (messages.length <= 1) return; // Don't save if only welcome message

    try {
      const existingHistory = JSON.parse(localStorage.getItem('gttc_chat_history') || '[]');
      
      // Generate conversation data
      const conversationData = {
        id: conversationId || `conv_${Date.now()}`,
        title: title || generateConversationTitle(messages),
        preview: generatePreview(messages),
        category: categorizeConversation(messages),
        messageCount: messages.length,
        duration: calculateDuration(messages.length),
        messages: messages,
        lastUpdated: new Date().toISOString()
      };

      // Check if conversation already exists and update it
      const existingIndex = existingHistory.findIndex(conv => conv.id === conversationData.id);
      
      if (existingIndex >= 0) {
        existingHistory[existingIndex] = conversationData;
      } else {
        existingHistory.unshift(conversationData); // Add to beginning
      }

      // Keep only last 50 conversations
      const limitedHistory = existingHistory.slice(0, 50);
      
      localStorage.setItem('gttc_chat_history', JSON.stringify(limitedHistory));
    } catch (error) {
      console.error('Error saving conversation to history:', error);
    }
  }, [conversationId]);

  // Generate conversation title from messages
  const generateConversationTitle = (messages) => {
    const userMessages = messages.filter(msg => msg.type === 'user');
    if (userMessages.length > 0) {
      const firstUserMessage = userMessages[0].text;
      // Take first 50 characters and add ellipsis if longer
      return firstUserMessage.length > 50 
        ? firstUserMessage.substring(0, 50) + '...'
        : firstUserMessage;
    }
    return 'New Conversation';
  };

  // Generate preview from messages
  const generatePreview = (messages) => {
    const botMessages = messages.filter(msg => msg.type === 'bot' && !msg.isError);
    if (botMessages.length > 0) {
      const lastBotMessage = botMessages[botMessages.length - 1].text;
      return lastBotMessage.length > 150 
        ? lastBotMessage.substring(0, 150) + '...'
        : lastBotMessage;
    }
    return 'No response available';
  };

  // Categorize conversation based on content
  const categorizeConversation = (messages) => {
    const allText = messages.map(msg => msg.text.toLowerCase()).join(' ');
    
    if (allText.includes('cnc') || allText.includes('manufacturing') || allText.includes('machining')) {
      return 'Manufacturing';
    } else if (allText.includes('safety') || allText.includes('hazard') || allText.includes('ppe') || allText.includes('loto')) {
      return 'Safety';
    } else if (allText.includes('quality') || allText.includes('control') || allText.includes('inspection') || allText.includes('spc')) {
      return 'Quality';
    } else if (allText.includes('plc') || allText.includes('automation') || allText.includes('robot') || allText.includes('scada')) {
      return 'Automation';
    } else if (allText.includes('maintenance') || allText.includes('repair') || allText.includes('preventive') || allText.includes('predictive')) {
      return 'Maintenance';
    } else if (allText.includes('lean') || allText.includes('waste') || allText.includes('5s')) {
      return 'Lean';
    }
    return 'General';
  };

  // Calculate estimated duration
  const calculateDuration = (messageCount) => {
    const estimatedMinutes = Math.max(1, Math.round(messageCount * 1.5));
    return `${estimatedMinutes} min`;
  };

  // Enhanced AI response generation
  const generateIntelligentResponse = useCallback(async (messageText, currentConversationId) => {
    // Search the learning database
    const searchResults = searchDatabase(messageText, currentConversationId, responseIntelligence);
    
    // Get conversation context
    const context = responseIntelligence.getContext(currentConversationId);
    
    // Generate contextual response
    const response = generateContextualResponse(messageText, searchResults, context);
    
    return {
      success: true,
      data: {
        message: response,
        conversation_id: currentConversationId || `conv_${Date.now()}`,
        searchResults: searchResults,
        context: context
      }
    };
  }, []);

  // Send a message
  const sendMessage = useCallback(async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    const currentConversationId = conversationId || `conv_${Date.now()}`;
    
    const userMessage = {
      type: 'user',
      text: messageText,
      timestamp: new Date(),
      id: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    setError(null);

    try {
      // Add realistic delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
      
      const response = await generateIntelligentResponse(messageText, currentConversationId);
      
      if (response.success) {
        const botMessage = {
          type: 'bot',
          text: response.data.message,
          timestamp: new Date(),
          id: Date.now() + 1,
          metadata: {
            searchResults: response.data.searchResults,
            context: response.data.context
          }
        };
        
        const finalMessages = [...updatedMessages, botMessage];
        setMessages(finalMessages);
        
        if (response.data.conversation_id && !conversationId) {
          setConversationId(response.data.conversation_id);
        }

        // Update response intelligence
        responseIntelligence.updateContext(currentConversationId, messageText, response.data.message);

        // Save to history after bot responds
        setTimeout(() => {
          saveConversationToHistory(finalMessages, conversationTitle);
        }, 100);
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      setError(err.message);
      const errorMessage = {
        type: 'bot',
        text: 'I apologize, but I encountered an error processing your request. Please try rephrasing your question or ask about a specific GTTC technical topic like CNC programming, safety procedures, quality control, automation, or maintenance.',
        timestamp: new Date(),
        id: Date.now() + 1,
        isError: true,
      };
      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
      
      // Save even error conversations
      setTimeout(() => {
        saveConversationToHistory(finalMessages, conversationTitle);
      }, 100);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, conversationId, messages, conversationTitle, saveConversationToHistory, generateIntelligentResponse]);

  // Clear chat
  const clearChat = useCallback(() => {
    // Save current conversation before clearing if it has content
    if (messages.length > 1) {
      saveConversationToHistory(messages, conversationTitle);
    }
    
    setMessages([]);
    setConversationId(null);
    setConversationTitle('');
    setError(null);
  }, [messages, conversationTitle, saveConversationToHistory]);

  // Load conversation history
  const loadConversation = useCallback(async (convId) => {
    setIsLoading(true);
    try {
      const savedHistory = JSON.parse(localStorage.getItem('gttc_chat_history') || '[]');
      const conversation = savedHistory.find(conv => conv.id === convId);
      
      if (conversation) {
        setMessages(conversation.messages || []);
        setConversationId(convId);
        setConversationTitle(conversation.title);
      } else {
        setError('Conversation not found');
      }
    } catch (err) {
      setError('Failed to load conversation');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    isLoading,
    error,
    conversationId,
    conversationTitle,
    messagesEndRef,
    sendMessage,
    clearChat,
    loadConversation,
    setConversationTitle,
  };
};

export default useChat;