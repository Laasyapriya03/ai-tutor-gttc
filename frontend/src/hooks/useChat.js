import { useState, useCallback, useRef, useEffect } from 'react';
import { chatAPI } from '../utils/api';

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
    } else if (allText.includes('safety') || allText.includes('hazard') || allText.includes('ppe')) {
      return 'Safety';
    } else if (allText.includes('quality') || allText.includes('control') || allText.includes('inspection')) {
      return 'Quality';
    } else if (allText.includes('plc') || allText.includes('automation') || allText.includes('robot')) {
      return 'Automation';
    } else if (allText.includes('maintenance') || allText.includes('repair') || allText.includes('preventive')) {
      return 'Maintenance';
    }
    return 'General';
  };

  // Calculate estimated duration
  const calculateDuration = (messageCount) => {
    const estimatedMinutes = Math.max(1, Math.round(messageCount * 1.5));
    return `${estimatedMinutes} min`;
  };

  // Send a message
  const sendMessage = useCallback(async (messageText) => {
    if (!messageText.trim() || isLoading) return;

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
      const response = await simulateAPIResponse(messageText, conversationId);
      
      if (response.success) {
        const botMessage = {
          type: 'bot',
          text: response.data.message,
          timestamp: new Date(),
          id: Date.now() + 1,
        };
        
        const finalMessages = [...updatedMessages, botMessage];
        setMessages(finalMessages);
        
        if (response.data.conversation_id) {
          setConversationId(response.data.conversation_id);
        }

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
        text: 'Sorry, I encountered an error. Please try again.',
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
  }, [isLoading, conversationId, messages, conversationTitle, saveConversationToHistory]);

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

// Simulate API response for demo purposes
const simulateAPIResponse = async (message, conversationId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  const lowerMessage = message.toLowerCase();
  
  // GTTC-specific responses
  const responses = {
    'cnc': 'CNC (Computer Numerical Control) programming involves creating instructions for automated machine tools. Key concepts include:\n\n• G-codes for machine movements\n• M-codes for machine functions\n• Coordinate systems (absolute/incremental)\n• Tool offsets and work coordinates\n• Feed rates and spindle speeds\n\nWould you like me to explain any specific aspect in more detail?',
    
    'safety': 'Industrial safety is paramount in GTTC training. Essential safety protocols include:\n\n• Lockout/Tagout (LOTO) procedures\n• Personal Protective Equipment (PPE)\n• Hazard identification and risk assessment\n• Emergency response procedures\n• Machine guarding and safety devices\n• Chemical handling and storage\n\nWhich safety topic would you like to explore further?',
    
    'quality': 'Quality control in manufacturing ensures products meet specifications. Key methods include:\n\n• Statistical Process Control (SPC)\n• Measurement and inspection techniques\n• Calibration procedures\n• Quality management systems\n• Continuous improvement (Kaizen)\n• Six Sigma methodologies\n\nWhat specific quality control aspect interests you?',
    
    'automation': 'Industrial automation increases efficiency and precision. Core technologies include:\n\n• Programmable Logic Controllers (PLCs)\n• SCADA systems\n• Human-Machine Interfaces (HMI)\n• Sensors and actuators\n• Industrial robotics\n• Process control systems\n\nWhich automation technology would you like to learn about?',
    
    'maintenance': 'Equipment maintenance strategies ensure optimal performance:\n\n• Preventive maintenance scheduling\n• Predictive maintenance techniques\n• Condition monitoring\n• Root cause analysis\n• Maintenance documentation\n• Spare parts management\n\nWhat maintenance topic can I help you with?',
    
    'plc': 'PLC (Programmable Logic Controller) programming is essential for automation:\n\n• Ladder logic fundamentals\n• Input/Output configuration\n• Timer and counter functions\n• Data handling and manipulation\n• Communication protocols\n• Troubleshooting techniques\n\nWould you like a specific PLC programming example?',
    
    'default': 'Thank you for your question about technical training. As your GTTC Learning Assistant, I can help with:\n\n• Manufacturing processes and CNC programming\n• Industrial safety and protocols\n• Quality control methods\n• Automation and PLC programming\n• Equipment maintenance\n• Technical problem-solving\n\nPlease feel free to ask about any specific technical topic!'
  };

  // Find matching response
  let responseText = responses.default;
  for (const [key, value] of Object.entries(responses)) {
    if (key !== 'default' && lowerMessage.includes(key)) {
      responseText = value;
      break;
    }
  }

  return {
    success: true,
    data: {
      message: responseText,
      conversation_id: conversationId || `conv_${Date.now()}`,
    },
  };
};

export default useChat;