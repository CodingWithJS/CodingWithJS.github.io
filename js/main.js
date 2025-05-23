// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => observer.observe(section));
});

// Smooth scroll for navigation links
document.querySelectorAll('a.nav-scroll[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add active class to nav links on scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const icon = mobileMenuToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      const icon = mobileMenuToggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    }
  });
});

// Blog content
const blogContent = {
  blog1: `# Building Intelligent Agents with Google's Agent Kit

In the rapidly evolving landscape of artificial intelligence, Google's Agent Kit has emerged as a powerful framework for building intelligent, autonomous agents. This comprehensive toolkit provides developers with the necessary components to create sophisticated AI systems that can understand, reason, and act in complex environments.

## What is Google's Agent Kit?

Google's Agent Kit is a modular framework designed to simplify the development of AI agents. It provides a structured approach to building agents that can:

- Process and understand natural language
- Make decisions based on context and goals
- Execute actions in various environments
- Learn from interactions and feedback

## Key Components

### 1. Language Understanding
The framework includes advanced natural language processing capabilities that allow agents to:
- Parse and understand user queries
- Extract relevant information
- Maintain context across conversations

### 2. Decision Making
Agents can make informed decisions through:
- Goal-oriented planning
- Context-aware reasoning
- Risk assessment and mitigation

### 3. Action Execution
The toolkit provides interfaces for:
- API integrations
- Task automation
- Environment interaction

## Implementation Example

Here's a basic example of how to create a simple agent using Google's Agent Kit:

\`\`\`python
from google.agent_kit import Agent, Action, Environment

class MyAgent(Agent):
    def __init__(self):
        super().__init__()
        self.knowledge_base = {}
        
    def process_input(self, user_input):
        # Process and understand user input
        intent = self.understand_intent(user_input)
        return self.plan_actions(intent)
        
    def execute_action(self, action):
        # Execute the planned action
        result = self.environment.execute(action)
        self.update_knowledge(result)
        return result
\`\`\`

## Best Practices

1. **Modular Design**
   - Break down complex tasks into smaller, manageable components
   - Use the framework's built-in modules when possible

2. **Error Handling**
   - Implement robust error handling mechanisms
   - Include fallback strategies for unexpected situations

3. **Testing and Validation**
   - Create comprehensive test suites
   - Validate agent behavior in various scenarios

## Future Implications

The development of intelligent agents using Google's Agent Kit has significant implications for:

- Customer service automation
- Personal assistant applications
- Educational tools
- Healthcare support systems

## Conclusion

Google's Agent Kit represents a significant step forward in making AI agent development more accessible and standardized. By providing a robust framework and comprehensive tools, it enables developers to create sophisticated AI systems that can effectively interact with users and environments.

As the framework continues to evolve, we can expect to see more advanced features and capabilities that will further enhance the development of intelligent agents.`,

  blog2: `# The Future of Education: AI-Powered Learning Systems

The integration of artificial intelligence in education is revolutionizing how we learn, teach, and interact with educational content. As AI technologies continue to advance, they're creating new opportunities for personalized learning, automated assessment, and enhanced educational experiences.

## The Current State of AI in Education

Today's educational landscape is being transformed by AI in several key areas:

### 1. Personalized Learning
AI systems can:
- Adapt to individual learning styles
- Provide customized content and pacing
- Identify knowledge gaps
- Offer targeted interventions

### 2. Intelligent Tutoring
Modern AI tutors can:
- Provide 24/7 assistance
- Answer questions in real-time
- Offer step-by-step guidance
- Track student progress

### 3. Automated Assessment
AI-powered assessment tools can:
- Grade assignments and exams
- Provide detailed feedback
- Identify patterns in student performance
- Generate progress reports

## Key Technologies Shaping Education

### Natural Language Processing
NLP enables:
- Automated essay grading
- Language learning assistance
- Content summarization
- Question answering systems

### Machine Learning
ML applications include:
- Predictive analytics for student success
- Adaptive learning algorithms
- Content recommendation systems
- Performance pattern recognition

### Computer Vision
Vision-based applications:
- Proctoring systems
- Handwriting recognition
- Visual learning aids
- Lab experiment analysis

## Implementation Challenges

1. **Data Privacy**
   - Ensuring student data protection
   - Complying with regulations
   - Maintaining ethical standards

2. **Accessibility**
   - Bridging the digital divide
   - Ensuring equal access
   - Supporting diverse learning needs

3. **Integration**
   - Seamless system integration
   - Teacher training
   - Curriculum adaptation

## Future Trends

### 1. Immersive Learning
- Virtual reality classrooms
- Augmented reality textbooks
- Interactive simulations
- 3D learning environments

### 2. Collaborative AI
- Group learning optimization
- Peer-to-peer matching
- Team project facilitation
- Social learning enhancement

### 3. Continuous Assessment
- Real-time progress tracking
- Adaptive testing
- Skill gap analysis
- Learning path optimization

## Best Practices for Implementation

1. **Start Small**
   - Begin with pilot programs
   - Gather feedback
   - Iterate and improve

2. **Focus on Outcomes**
   - Define clear objectives
   - Measure effectiveness
   - Adjust based on results

3. **Maintain Human Element**
   - Balance AI and human interaction
   - Preserve teacher-student relationships
   - Ensure emotional support

## Conclusion

The future of education lies in the successful integration of AI technologies that enhance rather than replace human teaching. By leveraging AI's capabilities while maintaining the essential human elements of education, we can create more effective, engaging, and personalized learning experiences for students worldwide.

As we continue to develop and refine these technologies, it's crucial to keep the focus on improving educational outcomes and ensuring equitable access to these powerful tools.`
};

// Load and display blog content
function loadBlogContent() {
  try {
    // Convert markdown to HTML and sanitize
    const blog1Html = DOMPurify.sanitize(marked.parse(blogContent.blog1));
    const blog2Html = DOMPurify.sanitize(marked.parse(blogContent.blog2));
    
    // Store full content
    window.blogContent = {
      blog1: blog1Html,
      blog2: blog2Html
    };
    
    // Display truncated content
    const blog1Element = document.getElementById('blog1-content');
    const blog2Element = document.getElementById('blog2-content');
    
    if (!blog1Element || !blog2Element) {
      throw new Error('Blog content elements not found in DOM');
    }
    
    blog1Element.innerHTML = truncateContent(blog1Html);
    blog2Element.innerHTML = truncateContent(blog2Html);
    
    // Add click handlers for "Read More"
    document.querySelectorAll('.read-more').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const blogId = button.dataset.blog;
        const contentId = `${blogId}-content`;
        const content = document.getElementById(contentId);
        
        if (!content) {
          console.error(`Content element not found: ${contentId}`);
          return;
        }
        
        if (button.textContent === 'Read More') {
          content.innerHTML = window.blogContent[blogId];
          button.textContent = 'Show Less';
        } else {
          content.innerHTML = truncateContent(window.blogContent[blogId]);
          button.textContent = 'Read More';
        }
      });
    });
  } catch (error) {
    console.error('Error loading blog content:', error);
    // Display error message to users
    document.querySelectorAll('.blog-content').forEach(content => {
      content.innerHTML = `
        <div class="error-message">
          <p>Sorry, there was an error loading the blog content. Please try again later.</p>
          <p class="error-details">${error.message}</p>
        </div>
      `;
    });
  }
}

function truncateContent(html) {
  if (!html) {
    console.error('No HTML content provided to truncate');
    return '<p>Content not available</p>';
  }
  
  // Create a temporary div to parse the HTML
  const temp = document.createElement('div');
  temp.innerHTML = html;
  
  // Get the first paragraph
  const firstParagraph = temp.querySelector('p');
  if (firstParagraph) {
    return firstParagraph.outerHTML;
  }
  
  return html;
}

// Load blog content when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadBlogContent();
}); 