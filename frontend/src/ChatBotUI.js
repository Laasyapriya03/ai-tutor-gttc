import React, { useState, useRef, useEffect } from 'react';

const ChatbotUI = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      const botMessage = {
        type: 'bot',
        text: `You said: "${userMessage.text}". Let me look that up...`
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-purple-700 text-white p-4 text-xl font-semibold shadow">
        AI Tutor Chat
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 max-w-xs rounded-lg shadow 
              ${msg.type === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatRef} />
      </div>

      <div className="flex p-4 bg-white border-t">
        <input
          type="text"
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotUI;
