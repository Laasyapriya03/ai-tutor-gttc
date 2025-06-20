import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Wrench, Cog, Shield, Zap, Users } from 'lucide-react';

const StudentPrompt = () => {
  const navigate = useNavigate();
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const promptCategories = [
    {
      id: 'manufacturing',
      title: 'Manufacturing Processes',
      icon: Cog,
      color: 'bg-blue-500',
      prompts: [
        {
          id: 1,
          title: 'CNC Machine Programming',
          description: 'Learn G-code programming for CNC machines and understand coordinate systems.',
          content: 'Explain the basics of CNC programming including G-codes, M-codes, and coordinate systems. Provide examples of simple machining operations.'
        },
        {
          id: 2,
          title: 'Quality Control Methods',
          description: 'Understanding statistical process control and measurement techniques.',
          content: 'Describe quality control methods used in manufacturing, including SPC charts, measurement tools, and inspection procedures.'
        },
        {
          id: 3,
          title: 'Lean Manufacturing',
          description: 'Principles of waste reduction and process optimization.',
          content: 'Explain lean manufacturing principles, 5S methodology, and continuous improvement techniques used in modern manufacturing.'
        }
      ]
    },
    {
      id: 'automation',
      title: 'Industrial Automation',
      icon: Zap,
      color: 'bg-green-500',
      prompts: [
        {
          id: 4,
          title: 'PLC Programming',
          description: 'Programmable Logic Controller basics and ladder logic.',
          content: 'Introduce PLC programming concepts, ladder logic diagrams, and common industrial applications of PLCs.'
        },
        {
          id: 5,
          title: 'SCADA Systems',
          description: 'Supervisory Control and Data Acquisition systems overview.',
          content: 'Explain SCADA system architecture, HMI design principles, and data acquisition methods in industrial settings.'
        },
        {
          id: 6,
          title: 'Robotics in Manufacturing',
          description: 'Industrial robots and their applications.',
          content: 'Describe types of industrial robots, their applications in manufacturing, and basic programming concepts.'
        }
      ]
    },
    {
      id: 'safety',
      title: 'Industrial Safety',
      icon: Shield,
      color: 'bg-red-500',
      prompts: [
        {
          id: 7,
          title: 'Lockout/Tagout Procedures',
          description: 'Energy isolation and safety procedures.',
          content: 'Explain LOTO procedures, energy sources identification, and step-by-step safety protocols for equipment maintenance.'
        },
        {
          id: 8,
          title: 'Personal Protective Equipment',
          description: 'PPE selection and usage guidelines.',
          content: 'Describe different types of PPE, selection criteria, proper usage, and maintenance procedures for industrial environments.'
        },
        {
          id: 9,
          title: 'Hazard Identification',
          description: 'Risk assessment and hazard analysis methods.',
          content: 'Explain hazard identification techniques, risk assessment matrices, and control measures for workplace safety.'
        }
      ]
    },
    {
      id: 'maintenance',
      title: 'Equipment Maintenance',
      icon: Wrench,
      color: 'bg-purple-500',
      prompts: [
        {
          id: 10,
          title: 'Preventive Maintenance',
          description: 'Scheduled maintenance strategies and planning.',
          content: 'Describe preventive maintenance strategies, scheduling methods, and documentation requirements for industrial equipment.'
        },
        {
          id: 11,
          title: 'Predictive Maintenance',
          description: 'Condition monitoring and predictive techniques.',
          content: 'Explain predictive maintenance technologies including vibration analysis, thermal imaging, and oil analysis techniques.'
        },
        {
          id: 12,
          title: 'Troubleshooting Methods',
          description: 'Systematic approach to problem solving.',
          content: 'Outline systematic troubleshooting methodologies, root cause analysis, and documentation of maintenance activities.'
        }
      ]
    }
  ];

  const handlePromptSelect = (prompt) => {
    setSelectedPrompt(prompt);
    // Navigate to chat with the selected prompt
    navigate('/chat', { state: { initialPrompt: prompt.content } });
  };

  return (
    <div className="student-prompt-container">
      <header className="prompt-header">
        <div className="prompt-header-content">
          <div className="prompt-title">
            <button onClick={() => navigate('/dashboard')} className="back-btn">
              <ArrowLeft size={20} />
            </button>
            <BookOpen size={28} color="#3b82f6" />
            <h1>Learning Prompts</h1>
          </div>
        </div>
      </header>

      <main className="prompt-main">
        <div className="welcome-section">
          <h2>Explore Technical Topics</h2>
          <p>Select from curated learning prompts designed to enhance your technical knowledge and skills.</p>
        </div>

        <div className="prompt-categories">
          {promptCategories.map((category) => (
            <div key={category.id} className="category-card">
              <div className="category-header">
                <div className={`category-icon ${category.color}`}>
                  <category.icon size={24} />
                </div>
                <h3 className="category-title">{category.title}</h3>
              </div>
              
              <div className="prompts-list">
                {category.prompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    className="prompt-item"
                    onClick={() => handlePromptSelect(prompt)}
                  >
                    <h4>{prompt.title}</h4>
                    <p>{prompt.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="additional-resources">
          <div className="resource-card">
            <Users size={32} color="#6366f1" />
            <div>
              <h3>Need Custom Help?</h3>
              <p>Can't find what you're looking for? Ask our AI assistant directly in the chat.</p>
              <button 
                onClick={() => navigate('/chat')}
                className="resource-btn"
              >
                Start Custom Chat
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentPrompt;