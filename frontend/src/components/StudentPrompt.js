import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Wrench, Cog, Shield, Zap, Users, Factory, TrendingUp, Settings } from 'lucide-react';

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
          title: 'CNC Machine Programming Fundamentals',
          description: 'Learn G-code programming, coordinate systems, and basic machining operations.',
          content: 'Explain CNC programming fundamentals including G-codes (G00, G01, G02, G03), M-codes (M03, M05, M06), coordinate systems (absolute vs incremental), work offsets, and tool compensation. Provide practical examples of simple machining operations.'
        },
        {
          id: 2,
          title: 'Advanced CNC Programming Techniques',
          description: 'Explore advanced programming concepts, optimization, and CAM integration.',
          content: 'Discuss advanced CNC programming including canned cycles, macro programming, optimization techniques for efficiency, CAM software integration (Mastercam, Fusion 360), and troubleshooting common programming issues.'
        },
        {
          id: 3,
          title: 'Quality Control and SPC Methods',
          description: 'Understanding statistical process control and measurement techniques.',
          content: 'Explain quality control methods including Statistical Process Control (SPC), control charts (X-bar, R-charts), process capability studies (Cp, Cpk), measurement tools (calipers, micrometers, CMM), and GD&T basics.'
        },
        {
          id: 4,
          title: 'Lean Manufacturing Implementation',
          description: 'Principles of waste reduction and process optimization.',
          content: 'Describe lean manufacturing principles, the 8 wastes (TIMWOODS), 5S methodology implementation, value stream mapping, continuous improvement (Kaizen), and practical examples of lean tools in manufacturing.'
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
          id: 5,
          title: 'PLC Programming Fundamentals',
          description: 'Programmable Logic Controller basics and ladder logic programming.',
          content: 'Introduce PLC programming concepts including ladder logic fundamentals, input/output configuration, basic instructions (contacts, coils), timer and counter functions, and practical examples of simple automation tasks.'
        },
        {
          id: 6,
          title: 'Advanced PLC Programming',
          description: 'Complex programming techniques and industrial applications.',
          content: 'Explain advanced PLC programming including function blocks, structured text, PID control implementation, communication protocols (Modbus, Ethernet/IP), HMI integration, and troubleshooting techniques.'
        },
        {
          id: 7,
          title: 'SCADA Systems Design',
          description: 'Supervisory Control and Data Acquisition systems overview.',
          content: 'Describe SCADA system architecture, HMI design principles, data acquisition methods, alarm management, historical data logging, communication protocols (DNP3, OPC), and cybersecurity considerations.'
        },
        {
          id: 8,
          title: 'Industrial Robotics Applications',
          description: 'Robot programming and integration in manufacturing.',
          content: 'Explain types of industrial robots, robot programming methods, coordinate systems, end-effector selection, safety considerations, integration with PLCs, and practical applications in manufacturing processes.'
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
          id: 9,
          title: 'Lockout/Tagout (LOTO) Procedures',
          description: 'Energy isolation and safety procedures for maintenance.',
          content: 'Explain comprehensive LOTO procedures including the 6 steps of LOTO, energy source identification (electrical, mechanical, pneumatic, hydraulic), proper lockout devices, verification procedures, and group lockout protocols.'
        },
        {
          id: 10,
          title: 'Personal Protective Equipment Selection',
          description: 'PPE selection, usage, and maintenance guidelines.',
          content: 'Describe different types of PPE including head protection, eye and face protection, hearing protection, respiratory protection, hand protection (glove selection by hazard type), foot protection, and proper PPE maintenance procedures.'
        },
        {
          id: 11,
          title: 'Hazard Identification and Risk Assessment',
          description: 'Systematic approach to workplace safety analysis.',
          content: 'Explain hazard identification techniques, risk assessment methodologies, hierarchy of controls (elimination, substitution, engineering, administrative, PPE), Job Safety Analysis (JSA), and incident investigation procedures.'
        },
        {
          id: 12,
          title: 'Machine Guarding and Safety Systems',
          description: 'Machine safety devices and protection systems.',
          content: 'Describe types of machine guards, safety devices (light curtains, pressure mats, emergency stops), safety-rated control systems, risk assessment for machinery, and compliance with safety standards (OSHA, ANSI).'
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
          id: 13,
          title: 'Preventive Maintenance Planning',
          description: 'Scheduled maintenance strategies and implementation.',
          content: 'Explain preventive maintenance principles, maintenance scheduling methods, equipment criticality analysis, CMMS implementation, maintenance task development, and performance metrics (MTBF, MTTR, OEE).'
        },
        {
          id: 14,
          title: 'Predictive Maintenance Technologies',
          description: 'Condition monitoring and predictive techniques.',
          content: 'Describe predictive maintenance technologies including vibration analysis, thermal imaging, oil analysis, ultrasonic testing, motor current signature analysis, and implementation strategies for condition-based maintenance.'
        },
        {
          id: 15,
          title: 'Root Cause Analysis Methods',
          description: 'Systematic troubleshooting and problem-solving techniques.',
          content: 'Explain root cause analysis methodologies including 5 Why analysis, fishbone diagrams, fault tree analysis, failure mode and effects analysis (FMEA), and documentation of corrective actions.'
        },
        {
          id: 16,
          title: 'Reliability Centered Maintenance',
          description: 'Strategic approach to maintenance optimization.',
          content: 'Describe RCM methodology, failure mode analysis, maintenance task selection, reliability engineering principles, spare parts management, and maintenance cost optimization strategies.'
        }
      ]
    },
    {
      id: 'quality',
      title: 'Quality Management',
      icon: TrendingUp,
      color: 'bg-indigo-500',
      prompts: [
        {
          id: 17,
          title: 'Six Sigma Methodology',
          description: 'DMAIC process and statistical quality improvement.',
          content: 'Explain Six Sigma principles, DMAIC methodology (Define, Measure, Analyze, Improve, Control), statistical tools, process capability analysis, and practical implementation in manufacturing environments.'
        },
        {
          id: 18,
          title: 'ISO 9001 Quality Management System',
          description: 'Quality management system implementation and auditing.',
          content: 'Describe ISO 9001 requirements, quality management system documentation, internal audit procedures, corrective and preventive actions, management review processes, and continuous improvement principles.'
        },
        {
          id: 19,
          title: 'Advanced Measurement Techniques',
          description: 'Precision measurement and calibration procedures.',
          content: 'Explain advanced measurement techniques, coordinate measuring machines (CMM), optical measurement systems, surface roughness measurement, calibration procedures, measurement uncertainty, and traceability requirements.'
        }
      ]
    },
    {
      id: 'processes',
      title: 'Manufacturing Processes',
      icon: Factory,
      color: 'bg-orange-500',
      prompts: [
        {
          id: 20,
          title: 'Metal Cutting and Machining',
          description: 'Cutting tools, parameters, and optimization techniques.',
          content: 'Explain metal cutting principles, cutting tool materials and geometries, cutting parameters optimization (speed, feed, depth), tool wear mechanisms, coolant selection, and surface finish considerations.'
        },
        {
          id: 21,
          title: 'Welding Processes and Quality',
          description: 'Welding techniques, inspection, and quality control.',
          content: 'Describe various welding processes (SMAW, GMAW, GTAW, SAW), welding parameters, joint design, welding defects, non-destructive testing methods, and welding procedure specifications (WPS).'
        },
        {
          id: 22,
          title: 'Heat Treatment Processes',
          description: 'Material properties modification through thermal processing.',
          content: 'Explain heat treatment processes (annealing, normalizing, hardening, tempering), phase diagrams, microstructure relationships, heat treatment equipment, and quality control methods for heat-treated parts.'
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
            <h1>GTTC Learning Modules</h1>
          </div>
        </div>
      </header>

      <main className="prompt-main">
        <div className="welcome-section">
          <h2>Comprehensive Technical Training Topics</h2>
          <p>Explore our extensive collection of GTTC-specific learning modules designed to enhance your technical knowledge and practical skills in manufacturing, automation, safety, and maintenance.</p>
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
            <Settings size={32} color="#6366f1" />
            <div>
              <h3>Custom Learning Path</h3>
              <p>Need help with a specific technical challenge? Our AI assistant can provide personalized guidance based on your current project or learning objectives.</p>
              <button 
                onClick={() => navigate('/chat')}
                className="resource-btn"
              >
                Start Custom Session
              </button>
            </div>
          </div>
          
          <div className="resource-card">
            <Users size={32} color="#10b981" />
            <div>
              <h3>Interactive Learning</h3>
              <p>Each module includes practical examples, real-world applications, and follow-up questions to deepen your understanding of GTTC technical concepts.</p>
              <button 
                onClick={() => navigate('/feedback')}
                className="resource-btn"
              >
                Provide Feedback
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentPrompt;