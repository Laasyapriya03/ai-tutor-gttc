// Comprehensive GTTC Learning Database
export const learningDatabase = {
  // Manufacturing Processes
  manufacturing: {
    cnc_programming: {
      title: "CNC Programming",
      topics: {
        basics: {
          title: "CNC Programming Basics",
          content: [
            {
              id: "cnc_001",
              question: "What is CNC programming?",
              answer: "CNC (Computer Numerical Control) programming is the process of creating coded instructions that control automated machine tools. These programs tell the machine exactly how to move, what tools to use, and how to manufacture parts with precision.",
              keywords: ["cnc", "programming", "computer numerical control", "automated"],
              difficulty: "beginner",
              category: "manufacturing"
            },
            {
              id: "cnc_002",
              question: "What are G-codes in CNC programming?",
              answer: "G-codes are preparatory commands that tell the CNC machine what type of action to perform. Common G-codes include: G00 (rapid positioning), G01 (linear interpolation), G02/G03 (circular interpolation), G90 (absolute positioning), and G91 (incremental positioning).",
              keywords: ["g-codes", "preparatory commands", "g00", "g01", "g02", "g03"],
              difficulty: "intermediate",
              category: "manufacturing"
            },
            {
              id: "cnc_003",
              question: "Explain coordinate systems in CNC machining",
              answer: "CNC machines use coordinate systems to define positions in 3D space. The most common is the Cartesian coordinate system with X, Y, and Z axes. X-axis typically represents left-right movement, Y-axis represents front-back movement, and Z-axis represents up-down movement. Work coordinate systems (G54-G59) allow multiple part setups.",
              keywords: ["coordinate systems", "cartesian", "x-axis", "y-axis", "z-axis", "work coordinates"],
              difficulty: "intermediate",
              category: "manufacturing"
            },
            {
              id: "cnc_004",
              question: "What are M-codes and their functions?",
              answer: "M-codes are miscellaneous functions that control machine operations. Key M-codes include: M03 (spindle start clockwise), M04 (spindle start counterclockwise), M05 (spindle stop), M06 (tool change), M08 (coolant on), M09 (coolant off), M30 (program end and rewind).",
              keywords: ["m-codes", "miscellaneous functions", "spindle", "tool change", "coolant"],
              difficulty: "intermediate",
              category: "manufacturing"
            }
          ]
        },
        advanced: {
          title: "Advanced CNC Programming",
          content: [
            {
              id: "cnc_adv_001",
              question: "How do you optimize CNC programs for efficiency?",
              answer: "CNC program optimization involves: 1) Minimizing tool changes, 2) Optimizing cutting parameters (speed, feed, depth), 3) Using efficient toolpaths, 4) Implementing proper work holding, 5) Reducing air cutting time, 6) Using canned cycles where appropriate, 7) Optimizing approach and retract moves.",
              keywords: ["optimization", "efficiency", "toolpaths", "cutting parameters", "canned cycles"],
              difficulty: "advanced",
              category: "manufacturing"
            },
            {
              id: "cnc_adv_002",
              question: "What is CAM software and how does it integrate with CNC?",
              answer: "CAM (Computer-Aided Manufacturing) software generates CNC programs from 3D CAD models. Popular CAM software includes Mastercam, Fusion 360, and PowerMill. CAM software automates toolpath generation, optimizes cutting strategies, simulates machining processes, and post-processes code for specific machine controllers.",
              keywords: ["cam software", "computer-aided manufacturing", "mastercam", "fusion 360", "toolpath generation"],
              difficulty: "advanced",
              category: "manufacturing"
            }
          ]
        }
      }
    },
    quality_control: {
      title: "Quality Control",
      topics: {
        measurement: {
          title: "Measurement and Inspection",
          content: [
            {
              id: "qc_001",
              question: "What are the basic measurement tools in manufacturing?",
              answer: "Essential measurement tools include: Vernier calipers (±0.02mm accuracy), micrometers (±0.001mm accuracy), dial indicators, height gauges, surface roughness testers, coordinate measuring machines (CMM), and optical comparators. Each tool has specific applications and accuracy levels.",
              keywords: ["measurement tools", "vernier calipers", "micrometers", "dial indicators", "cmm"],
              difficulty: "beginner",
              category: "quality"
            },
            {
              id: "qc_002",
              question: "How does Statistical Process Control (SPC) work?",
              answer: "SPC uses statistical methods to monitor and control manufacturing processes. Key elements include: control charts (X-bar, R-charts), process capability studies (Cp, Cpk), sampling plans, and trend analysis. SPC helps identify process variations before defects occur, ensuring consistent quality.",
              keywords: ["spc", "statistical process control", "control charts", "process capability", "cp", "cpk"],
              difficulty: "intermediate",
              category: "quality"
            },
            {
              id: "qc_003",
              question: "What is GD&T and why is it important?",
              answer: "Geometric Dimensioning and Tolerancing (GD&T) is a symbolic language that defines the geometry of parts. It specifies tolerances for form, orientation, location, and runout. GD&T provides clearer communication between design and manufacturing, reduces inspection time, and ensures functional requirements are met.",
              keywords: ["gdt", "geometric dimensioning", "tolerancing", "form", "orientation", "location", "runout"],
              difficulty: "advanced",
              category: "quality"
            }
          ]
        }
      }
    }
  },

  // Industrial Safety
  safety: {
    lockout_tagout: {
      title: "Lockout/Tagout (LOTO)",
      topics: {
        procedures: {
          title: "LOTO Procedures",
          content: [
            {
              id: "safety_001",
              question: "What is Lockout/Tagout (LOTO)?",
              answer: "LOTO is a safety procedure that ensures dangerous machines are properly shut off and not able to be started up again prior to maintenance or repair work. It involves isolating energy sources, applying locks and tags, and verifying zero energy state to protect workers from hazardous energy release.",
              keywords: ["loto", "lockout", "tagout", "energy isolation", "safety procedure"],
              difficulty: "beginner",
              category: "safety"
            },
            {
              id: "safety_002",
              question: "What are the six steps of LOTO procedure?",
              answer: "The six LOTO steps are: 1) Preparation - identify energy sources and shutdown procedures, 2) Shutdown - turn off equipment using normal procedures, 3) Isolation - disconnect or isolate energy sources, 4) Lockout/Tagout - apply locks and tags, 5) Stored Energy - release or restrain stored energy, 6) Verification - test that equipment cannot be restarted.",
              keywords: ["loto steps", "preparation", "shutdown", "isolation", "stored energy", "verification"],
              difficulty: "intermediate",
              category: "safety"
            },
            {
              id: "safety_003",
              question: "What types of energy sources require LOTO?",
              answer: "Energy sources requiring LOTO include: Electrical (motors, circuits, capacitors), Mechanical (springs, rotating equipment, elevated parts), Pneumatic (compressed air systems), Hydraulic (pressurized fluids), Chemical (hazardous substances), Thermal (steam, hot surfaces), and Gravitational (suspended loads).",
              keywords: ["energy sources", "electrical", "mechanical", "pneumatic", "hydraulic", "chemical", "thermal"],
              difficulty: "intermediate",
              category: "safety"
            }
          ]
        }
      }
    },
    ppe: {
      title: "Personal Protective Equipment",
      topics: {
        selection: {
          title: "PPE Selection and Use",
          content: [
            {
              id: "ppe_001",
              question: "What are the main categories of PPE?",
              answer: "PPE categories include: Head protection (hard hats, bump caps), Eye and face protection (safety glasses, face shields), Hearing protection (earplugs, earmuffs), Respiratory protection (masks, respirators), Hand protection (gloves), Foot protection (safety boots), and Body protection (coveralls, aprons).",
              keywords: ["ppe categories", "head protection", "eye protection", "hearing protection", "respiratory", "hand protection"],
              difficulty: "beginner",
              category: "safety"
            },
            {
              id: "ppe_002",
              question: "How do you select appropriate safety gloves?",
              answer: "Glove selection depends on hazards: Cut-resistant gloves (ANSI/ISEA levels A1-A9) for sharp objects, Chemical-resistant gloves (nitrile, neoprene) for chemicals, Heat-resistant gloves for hot surfaces, Electrical insulating gloves for electrical work, and Disposable gloves for contamination protection. Consider dexterity requirements and comfort.",
              keywords: ["safety gloves", "cut-resistant", "chemical-resistant", "heat-resistant", "electrical insulating", "ansi levels"],
              difficulty: "intermediate",
              category: "safety"
            }
          ]
        }
      }
    }
  },

  // Industrial Automation
  automation: {
    plc_programming: {
      title: "PLC Programming",
      topics: {
        basics: {
          title: "PLC Fundamentals",
          content: [
            {
              id: "plc_001",
              question: "What is a PLC and how does it work?",
              answer: "A Programmable Logic Controller (PLC) is an industrial computer that controls manufacturing processes. It reads inputs from sensors, processes logic according to programmed instructions, and controls outputs like motors and valves. PLCs operate in a continuous scan cycle: input scan, program execution, output update.",
              keywords: ["plc", "programmable logic controller", "industrial computer", "scan cycle", "inputs", "outputs"],
              difficulty: "beginner",
              category: "automation"
            },
            {
              id: "plc_002",
              question: "What is ladder logic programming?",
              answer: "Ladder logic is a graphical programming language that resembles electrical relay circuits. It uses symbols like contacts (normally open/closed), coils (outputs), and function blocks. Programs are organized in rungs that execute from left to right, top to bottom. It's intuitive for electricians familiar with relay logic.",
              keywords: ["ladder logic", "graphical programming", "contacts", "coils", "rungs", "relay logic"],
              difficulty: "beginner",
              category: "automation"
            },
            {
              id: "plc_003",
              question: "What are the main PLC programming languages?",
              answer: "IEC 61131-3 defines five PLC programming languages: 1) Ladder Diagram (LD) - graphical relay logic, 2) Function Block Diagram (FBD) - graphical blocks, 3) Structured Text (ST) - high-level text language, 4) Instruction List (IL) - assembly-like language, 5) Sequential Function Chart (SFC) - state-based programming.",
              keywords: ["plc languages", "iec 61131-3", "ladder diagram", "function block", "structured text", "sequential function chart"],
              difficulty: "intermediate",
              category: "automation"
            }
          ]
        },
        advanced: {
          title: "Advanced PLC Programming",
          content: [
            {
              id: "plc_adv_001",
              question: "How do you implement PID control in PLCs?",
              answer: "PID (Proportional-Integral-Derivative) control in PLCs involves: 1) Configuring PID function block with process variable, setpoint, and output, 2) Tuning parameters (Kp, Ki, Kd), 3) Setting output limits and scaling, 4) Implementing anti-windup protection, 5) Adding manual/auto mode switching. Many PLCs have built-in PID instructions with auto-tuning capabilities.",
              keywords: ["pid control", "proportional", "integral", "derivative", "tuning", "kp", "ki", "kd", "auto-tuning"],
              difficulty: "advanced",
              category: "automation"
            }
          ]
        }
      }
    },
    scada: {
      title: "SCADA Systems",
      topics: {
        fundamentals: {
          title: "SCADA Fundamentals",
          content: [
            {
              id: "scada_001",
              question: "What is SCADA and its components?",
              answer: "SCADA (Supervisory Control and Data Acquisition) is a system for monitoring and controlling industrial processes. Components include: HMI (Human Machine Interface) for operator interaction, RTUs (Remote Terminal Units) for field data collection, Communication networks, Historical data servers, and Alarm management systems.",
              keywords: ["scada", "supervisory control", "data acquisition", "hmi", "rtu", "remote terminal units"],
              difficulty: "beginner",
              category: "automation"
            },
            {
              id: "scada_002",
              question: "What communication protocols are used in SCADA?",
              answer: "Common SCADA protocols include: Modbus (RTU/TCP) for device communication, DNP3 for utility applications, OPC (OLE for Process Control) for software integration, Ethernet/IP for industrial Ethernet, and Profibus for German automation systems. Protocol selection depends on application requirements and existing infrastructure.",
              keywords: ["scada protocols", "modbus", "dnp3", "opc", "ethernet ip", "profibus"],
              difficulty: "intermediate",
              category: "automation"
            }
          ]
        }
      }
    }
  },

  // Equipment Maintenance
  maintenance: {
    preventive: {
      title: "Preventive Maintenance",
      topics: {
        planning: {
          title: "Maintenance Planning",
          content: [
            {
              id: "maint_001",
              question: "What is preventive maintenance and its benefits?",
              answer: "Preventive maintenance involves scheduled maintenance activities performed before equipment failure occurs. Benefits include: Reduced unplanned downtime, Extended equipment life, Lower repair costs, Improved safety, Better product quality, and Increased overall equipment effectiveness (OEE). It's based on time, usage, or condition triggers.",
              keywords: ["preventive maintenance", "scheduled maintenance", "downtime", "equipment life", "oee"],
              difficulty: "beginner",
              category: "maintenance"
            },
            {
              id: "maint_002",
              question: "How do you develop a preventive maintenance schedule?",
              answer: "Developing PM schedules involves: 1) Equipment inventory and criticality analysis, 2) Manufacturer recommendations review, 3) Historical failure data analysis, 4) Resource availability assessment, 5) Task frequency optimization, 6) Work order generation, 7) Performance monitoring and adjustment. Use CMMS software for scheduling and tracking.",
              keywords: ["pm schedule", "equipment inventory", "criticality analysis", "failure data", "cmms"],
              difficulty: "intermediate",
              category: "maintenance"
            }
          ]
        }
      }
    },
    predictive: {
      title: "Predictive Maintenance",
      topics: {
        techniques: {
          title: "Predictive Maintenance Techniques",
          content: [
            {
              id: "pred_001",
              question: "What is vibration analysis in predictive maintenance?",
              answer: "Vibration analysis monitors machine vibration patterns to detect developing problems. Key parameters include: Amplitude (severity), Frequency (fault identification), and Phase (timing relationships). Common faults detected: Unbalance, misalignment, bearing defects, gear problems, and looseness. Uses accelerometers and spectrum analyzers for data collection.",
              keywords: ["vibration analysis", "amplitude", "frequency", "phase", "unbalance", "misalignment", "bearing defects"],
              difficulty: "intermediate",
              category: "maintenance"
            },
            {
              id: "pred_002",
              question: "How does thermal imaging help in maintenance?",
              answer: "Thermal imaging detects temperature variations that indicate equipment problems. Applications include: Electrical connections (hot spots indicate loose connections), Motor bearings (overheating), Steam traps (proper operation), Insulation defects, and Process equipment monitoring. Thermal cameras provide non-contact, real-time temperature measurement.",
              keywords: ["thermal imaging", "temperature variations", "electrical connections", "hot spots", "motor bearings", "thermal cameras"],
              difficulty: "intermediate",
              category: "maintenance"
            },
            {
              id: "pred_003",
              question: "What is oil analysis and what does it reveal?",
              answer: "Oil analysis examines lubricant condition and contamination to assess equipment health. Tests include: Viscosity (oil degradation), Particle count (wear debris), Water content (contamination), Acid number (oxidation), and Spectroscopic analysis (wear metals). Results indicate bearing wear, contamination sources, and oil change intervals.",
              keywords: ["oil analysis", "lubricant condition", "viscosity", "particle count", "water content", "wear metals"],
              difficulty: "intermediate",
              category: "maintenance"
            }
          ]
        }
      }
    }
  },

  // Lean Manufacturing
  lean: {
    principles: {
      title: "Lean Manufacturing Principles",
      topics: {
        waste_elimination: {
          title: "Waste Elimination",
          content: [
            {
              id: "lean_001",
              question: "What are the 8 wastes in lean manufacturing?",
              answer: "The 8 wastes (TIMWOODS) are: 1) Transportation - unnecessary movement of materials, 2) Inventory - excess stock, 3) Motion - unnecessary worker movement, 4) Waiting - idle time, 5) Overproduction - making more than needed, 6) Over-processing - doing more than required, 7) Defects - rework and scrap, 8) Skills - underutilized human potential.",
              keywords: ["8 wastes", "timwoods", "transportation", "inventory", "motion", "waiting", "overproduction", "defects"],
              difficulty: "beginner",
              category: "lean"
            },
            {
              id: "lean_002",
              question: "What is 5S methodology?",
              answer: "5S is a workplace organization method: 1) Sort (Seiri) - remove unnecessary items, 2) Set in Order (Seiton) - organize remaining items, 3) Shine (Seiso) - clean and inspect, 4) Standardize (Seiketsu) - establish standards, 5) Sustain (Shitsuke) - maintain discipline. 5S improves efficiency, safety, and quality.",
              keywords: ["5s methodology", "sort", "set in order", "shine", "standardize", "sustain", "workplace organization"],
              difficulty: "beginner",
              category: "lean"
            }
          ]
        }
      }
    }
  }
};

// Response intelligence system
export class ResponseIntelligence {
  constructor() {
    this.conversationHistory = new Map();
    this.responseCache = new Map();
    this.contextMemory = new Map();
  }

  // Track conversation context
  updateContext(conversationId, userMessage, botResponse) {
    if (!this.conversationHistory.has(conversationId)) {
      this.conversationHistory.set(conversationId, []);
    }
    
    const history = this.conversationHistory.get(conversationId);
    history.push({
      user: userMessage.toLowerCase(),
      bot: botResponse,
      timestamp: Date.now(),
      topics: this.extractTopics(userMessage)
    });

    // Keep only last 20 exchanges to manage memory
    if (history.length > 20) {
      history.splice(0, history.length - 20);
    }
  }

  // Extract topics from user message
  extractTopics(message) {
    const topics = [];
    const lowerMessage = message.toLowerCase();
    
    // Check for main categories
    if (lowerMessage.includes('cnc') || lowerMessage.includes('machining')) topics.push('cnc');
    if (lowerMessage.includes('safety') || lowerMessage.includes('loto')) topics.push('safety');
    if (lowerMessage.includes('quality') || lowerMessage.includes('inspection')) topics.push('quality');
    if (lowerMessage.includes('plc') || lowerMessage.includes('automation')) topics.push('automation');
    if (lowerMessage.includes('maintenance') || lowerMessage.includes('repair')) topics.push('maintenance');
    if (lowerMessage.includes('lean') || lowerMessage.includes('waste')) topics.push('lean');
    
    return topics;
  }

  // Check if similar question was asked recently
  hasRecentSimilarQuery(conversationId, userMessage) {
    const history = this.conversationHistory.get(conversationId) || [];
    const currentTopics = this.extractTopics(userMessage);
    const lowerMessage = userMessage.toLowerCase();
    
    // Check last 5 messages for similarity
    const recentMessages = history.slice(-5);
    
    for (const exchange of recentMessages) {
      // Check for exact or very similar questions
      const similarity = this.calculateSimilarity(lowerMessage, exchange.user);
      if (similarity > 0.8) {
        return exchange.bot;
      }
      
      // Check for topic overlap
      const topicOverlap = currentTopics.filter(topic => 
        exchange.topics.includes(topic)
      ).length;
      
      if (topicOverlap > 0 && similarity > 0.6) {
        return exchange.bot;
      }
    }
    
    return null;
  }

  // Calculate message similarity
  calculateSimilarity(str1, str2) {
    const words1 = str1.split(' ').filter(word => word.length > 3);
    const words2 = str2.split(' ').filter(word => word.length > 3);
    
    if (words1.length === 0 || words2.length === 0) return 0;
    
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  }

  // Get conversation context
  getContext(conversationId) {
    const history = this.conversationHistory.get(conversationId) || [];
    const recentTopics = new Set();
    
    // Collect topics from recent messages
    history.slice(-3).forEach(exchange => {
      exchange.topics.forEach(topic => recentTopics.add(topic));
    });
    
    return {
      recentTopics: Array.from(recentTopics),
      messageCount: history.length,
      lastInteraction: history.length > 0 ? history[history.length - 1].timestamp : null
    };
  }
}

// Smart search function
export function searchDatabase(query, conversationId = null, responseIntelligence = null) {
  const lowerQuery = query.toLowerCase();
  const results = [];
  const usedResponses = new Set();

  // Check for repetitive queries
  if (responseIntelligence && conversationId) {
    const previousResponse = responseIntelligence.hasRecentSimilarQuery(conversationId, query);
    if (previousResponse) {
      // Return a follow-up or clarification instead of repeating
      return [{
        answer: `I notice we discussed this recently. Would you like me to elaborate on any specific aspect, or do you have a different question about this topic? Feel free to ask for more details or examples.`,
        isFollowUp: true
      }];
    }
  }

  // Search through all categories and topics
  Object.values(learningDatabase).forEach(category => {
    Object.values(category).forEach(subject => {
      Object.values(subject.topics).forEach(topic => {
        topic.content.forEach(item => {
          const score = calculateRelevanceScore(lowerQuery, item);
          if (score > 0.3) {
            results.push({
              ...item,
              relevanceScore: score,
              subject: subject.title
            });
          }
        });
      });
    });
  });

  // Sort by relevance and remove duplicates
  results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  
  // Return top 3 most relevant results
  return results.slice(0, 3);
}

// Calculate relevance score
function calculateRelevanceScore(query, item) {
  let score = 0;
  const queryWords = query.split(' ').filter(word => word.length > 2);
  
  // Check question match
  const questionWords = item.question.toLowerCase().split(' ');
  queryWords.forEach(word => {
    if (questionWords.some(qWord => qWord.includes(word) || word.includes(qWord))) {
      score += 0.3;
    }
  });
  
  // Check keyword match
  queryWords.forEach(word => {
    if (item.keywords.some(keyword => keyword.includes(word) || word.includes(keyword))) {
      score += 0.4;
    }
  });
  
  // Check answer content match
  const answerWords = item.answer.toLowerCase().split(' ');
  queryWords.forEach(word => {
    if (answerWords.some(aWord => aWord.includes(word))) {
      score += 0.1;
    }
  });
  
  return Math.min(score, 1.0);
}

// Generate contextual responses
export function generateContextualResponse(query, searchResults, context = {}) {
  if (searchResults.length === 0) {
    return generateFallbackResponse(query, context);
  }

  if (searchResults[0].isFollowUp) {
    return searchResults[0].answer;
  }

  const primaryResult = searchResults[0];
  let response = primaryResult.answer;

  // Add context-aware enhancements
  if (context.recentTopics && context.recentTopics.length > 0) {
    const relatedTopics = context.recentTopics.filter(topic => 
      primaryResult.keywords.some(keyword => keyword.includes(topic))
    );
    
    if (relatedTopics.length > 0) {
      response += `\n\nSince we've been discussing ${relatedTopics.join(' and ')}, you might also be interested in related aspects of this topic.`;
    }
  }

  // Add follow-up suggestions
  if (searchResults.length > 1) {
    response += `\n\n**Related Topics:**`;
    searchResults.slice(1, 3).forEach((result, index) => {
      response += `\n${index + 1}. ${result.question}`;
    });
  }

  // Add difficulty-based guidance
  if (primaryResult.difficulty === 'advanced') {
    response += `\n\n*Note: This is an advanced topic. If you need clarification on any concepts, feel free to ask for more basic explanations.*`;
  }

  return response;
}

// Generate fallback response for unknown queries
function generateFallbackResponse(query, context) {
  const fallbackResponses = [
    "I understand you're asking about technical training topics. While I don't have specific information about that exact question, I can help you with CNC programming, industrial safety, quality control, automation, or maintenance topics. Could you rephrase your question or ask about one of these areas?",
    
    "That's an interesting question about technical training. I specialize in GTTC curriculum areas including manufacturing processes, safety protocols, automation systems, and equipment maintenance. Could you provide more context or ask about a specific technical area?",
    
    "I want to make sure I give you the most accurate information. Could you clarify what specific aspect of technical training you're interested in? I can help with topics like CNC machining, PLC programming, quality control, safety procedures, or maintenance practices.",
  ];

  // Select response based on context
  let responseIndex = 0;
  if (context.messageCount > 5) {
    responseIndex = 1;
  } else if (context.recentTopics && context.recentTopics.length > 0) {
    responseIndex = 2;
  }

  return fallbackResponses[responseIndex];
}

export default learningDatabase;