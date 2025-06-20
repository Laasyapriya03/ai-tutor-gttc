import { useState, useCallback, useRef, useEffect } from 'react';
import { chatAPI } from '../utils/api';

// Custom hook for managing chat functionality
export const useChat = (initialMessages = []) => {
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Send a message
  const sendMessage = useCallback(async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      text: messageText,
      timestamp: new Date(),
      id: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call the backend API
      // For now, we'll simulate the API call with predefined responses
      const response = await simulateAPIResponse(messageText, conversationId);
      
      if (response.success) {
        const botMessage = {
          type: 'bot',
          text: response.data.message,
          timestamp: new Date(),
          id: Date.now() + 1,
        };
        
        setMessages(prev => [...prev, botMessage]);
        
        if (response.data.conversation_id) {
          setConversationId(response.data.conversation_id);
        }
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
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, conversationId]);

  // Clear chat
  const clearChat = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    setError(null);
  }, []);

  // Load conversation history
  const loadConversation = useCallback(async (convId) => {
    setIsLoading(true);
    try {
      const response = await chatAPI.getConversation(convId);
      if (response.success) {
        setMessages(response.data.messages);
        setConversationId(convId);
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
    messagesEndRef,
    sendMessage,
    clearChat,
    loadConversation,
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