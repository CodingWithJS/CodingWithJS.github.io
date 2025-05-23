// Chatbot functionality
document.addEventListener('DOMContentLoaded', async function() {
  const chatbotToggle = document.querySelector('.chatbot-toggle');
  const chatbotContainer = document.querySelector('.chatbot-container');
  const chatbotClose = document.querySelector('.chatbot-close');
  const aiInput = document.getElementById('ai-input');
  const aiSend = document.getElementById('ai-send');
  const aiMessages = document.getElementById('ai-messages');

  // Toggle chatbot visibility
  chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
  });

  chatbotClose.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
  });

  // Training data for the ML model
  const trainingData = [
    { input: 'experience jpmorgan', output: 'jpmorgan' },
    { input: 'experience illinois', output: 'illinois' },
    { input: 'skills frontend', output: 'frontend' },
    { input: 'skills backend', output: 'backend' },
    { input: 'skills cloud', output: 'cloud' },
    { input: 'projects data', output: 'data' },
    { input: 'projects ml', output: 'ml' },
    { input: 'projects cloud', output: 'cloud' },
    { input: 'education uiuc', output: 'uiuc' },
    { input: 'education tech', output: 'tech' },
    { input: 'contact linkedin', output: 'linkedin' },
    { input: 'contact github', output: 'github' }
  ];

  // Create and train a simple model
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 16, activation: 'relu', inputShape: [trainingData.length] }));
  model.add(tf.layers.dense({ units: 8, activation: 'relu' }));
  model.add(tf.layers.dense({ units: trainingData.length, activation: 'softmax' }));

  model.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  });

  // Prepare training data
  const xs = tf.tensor2d(trainingData.map((_, i) => {
    const arr = new Array(trainingData.length).fill(0);
    arr[i] = 1;
    return arr;
  }));

  const ys = tf.tensor2d(trainingData.map((_, i) => {
    const arr = new Array(trainingData.length).fill(0);
    arr[i] = 1;
    return arr;
  }));

  // Train the model
  await model.fit(xs, ys, {
    epochs: 100,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch}: loss = ${logs.loss}`);
      }
    }
  });

  // Enhanced responses for the AI assistant
  const aiResponses = {
    'experience': {
      'jpmorgan': 'At JPMorgan Chase, I worked as an Associate Software Engineer III, where I developed and maintained high-performance trading systems. I implemented real-time data processing pipelines and optimized system performance by 40%.',
      'illinois': 'At the University of Illinois, I served as a Graduate Teaching Assistant, where I mentored students in data structures and algorithms. I also conducted research in machine learning and data science.',
      'default': 'I have extensive experience in software engineering, including roles at JPMorgan Chase and the University of Illinois. I specialize in full-stack development, data science, and cloud technologies. Would you like to know more about my experience at JPMorgan or Illinois?'
    },
    'skills': {
      'frontend': 'My frontend skills include React, JavaScript, HTML5, and CSS3. I\'ve built responsive web applications with modern UI/UX principles and implemented complex state management solutions.',
      'backend': 'For backend development, I\'m proficient in Java, Python, Spring Boot, and Node.js. I\'ve designed RESTful APIs, implemented microservices, and worked with various databases.',
      'cloud': 'In cloud and DevOps, I have experience with AWS, Kubernetes, Docker, and Git. I\'ve deployed scalable applications and implemented CI/CD pipelines.',
      'default': 'My technical skills span across frontend, backend, and cloud technologies. I\'m particularly strong in full-stack development, data science, and cloud architecture. Would you like to know more about my frontend, backend, or cloud skills?'
    },
    'projects': {
      'data': 'I\'ve worked on data visualization projects using D3.js and React, creating interactive dashboards for real-time data analysis. These projects helped businesses make data-driven decisions.',
      'ml': 'In machine learning, I\'ve developed predictive models for financial markets and implemented natural language processing solutions for text analysis.',
      'cloud': 'I\'ve built cloud-native applications using AWS services, implementing serverless architectures and containerized microservices.',
      'default': 'I have worked on various projects including data visualization dashboards, machine learning models, and cloud-based applications. Would you like to know more about my data, machine learning, or cloud projects?'
    },
    'education': {
      'uiuc': 'I am currently pursuing a Master\'s in Computer Science with a specialization in Data Science at the University of Illinois Urbana-Champaign. My coursework includes machine learning, data mining, and cloud computing.',
      'tech': 'I also have a background in Technology Management, which helps me bridge the gap between technical solutions and business needs.',
      'default': 'I am currently pursuing a Master\'s in Computer Science with a specialization in Data Science at the University of Illinois Urbana-Champaign. Would you like to know more about my studies at UIUC or my technology management background?'
    },
    'contact': {
      'linkedin': 'You can connect with me on LinkedIn at https://www.linkedin.com/in/jeremy-samuel. I regularly share insights about software engineering and data science.',
      'github': 'Check out my GitHub profile at https://github.com/jeremy-samuel to see my open-source contributions and personal projects.',
      'default': 'You can reach me through LinkedIn or GitHub. Would you like the links to my LinkedIn or GitHub profiles?'
    },
    'default': 'I can help you learn more about my experience, skills, projects, education, or contact information. What would you like to know?'
  };

  // Keyword map for flexible matching
  const keywordMap = {
    experience: ['experience', 'work', 'job', 'career', 'jpmorgan', 'illinois', 'teaching', 'assistant'],
    skills: ['skills', 'frontend', 'backend', 'cloud', 'aws', 'react', 'python', 'java', 'spring', 'node', 'kubernetes', 'docker', 'git'],
    projects: ['project', 'projects', 'data', 'ml', 'cloud', 'visualization', 'dashboard', 'ai', 'machine learning'],
    education: ['education', 'study', 'university', 'uiuc', 'tech', 'school', 'degree', 'masters', 'bachelors'],
    contact: ['contact', 'linkedin', 'github', 'email', 'reach', 'connect'],
  };

  function findCategoryAndSubcategory(userInput) {
    userInput = userInput.toLowerCase();
    let foundCategory = 'default';
    let foundSubcategory = 'default';

    // Find category
    for (const [cat, keywords] of Object.entries(keywordMap)) {
      if (keywords.some(word => userInput.includes(word))) {
        foundCategory = cat;
        break;
      }
    }

    // Find subcategory
    if (foundCategory !== 'default') {
      for (const subcat of Object.keys(aiResponses[foundCategory])) {
        if (userInput.includes(subcat)) {
          foundSubcategory = subcat;
          break;
        }
      }
    }

    return { foundCategory, foundSubcategory };
  }

  function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${isUser ? 'user-message' : 'assistant-message'}`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    aiMessages.appendChild(messageDiv);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }

  async function predictResponse(userInput) {
    const input = userInput.toLowerCase();
    const inputVector = trainingData.map((_, i) => {
      const arr = new Array(trainingData.length).fill(0);
      arr[i] = 1;
      return arr;
    });

    const prediction = model.predict(tf.tensor2d(inputVector));
    const result = await prediction.argMax(1).data();
    const predictedIndex = result[0];
    
    return trainingData[predictedIndex].output;
  }

  async function webSearch(query) {
    try {
      const apiUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&no_html=1`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.AbstractText) {
        return data.AbstractText;
      } else if (data.RelatedTopics && data.RelatedTopics.length > 0 && data.RelatedTopics[0].Text) {
        return data.RelatedTopics[0].Text;
      } else {
        return "Sorry, I couldn't find information on that topic.";
      }
    } catch (err) {
      return "Sorry, I couldn't search the web right now.";
    }
  }

  async function handleUserInput() {
    const userInput = aiInput.value.trim().toLowerCase();
    if (!userInput) return;

    addMessage(userInput, true);
    aiInput.value = '';

    // Use improved keyword matching
    const { foundCategory, foundSubcategory } = findCategoryAndSubcategory(userInput);
    let response =
      (aiResponses[foundCategory] && aiResponses[foundCategory][foundSubcategory]) ||
      (aiResponses[foundCategory] && aiResponses[foundCategory]['default']) ||
      aiResponses['default'];

    let found = foundCategory !== 'default' && response && response !== aiResponses['default'];

    if (!found || !response) {
      // If not found, try web search
      addMessage("Let me look that up for you...");
      response = await webSearch(userInput);
    }
    addMessage(response);
  }

  aiSend.addEventListener('click', handleUserInput);
  aiInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleUserInput();
    }
  });

  // Add welcome message
  //addMessage('Hello! I\'m your AI assistant. I can help you learn more about Jeremy\'s experience, skills, projects, education, or contact information. What would you like to know?');
}); 