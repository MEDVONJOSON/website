/**
 * Platfo.med AI Chat Assistant
 * A smart chat box for web development and portfolio building assistance
 */

class PlatfoChat {
    constructor() {
        this.isOpen = false;
        this.isTyping = false;
        this.chatHistory = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.addWelcomeMessage();
    }

    bindEvents() {
        // Toggle chat box
        const toggleBtn = document.getElementById('platfoChatToggle');
        const closeBtn = document.getElementById('platfoChatClose');
        const sendBtn = document.getElementById('platfoChatSend');
        const inputField = document.getElementById('platfoChatInput');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleChat());
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeChat());
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        if (inputField) {
            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            inputField.addEventListener('input', () => {
                this.updateSendButton();
            });
        }

        // Add pulse animation to toggle button after 3 seconds
        setTimeout(() => {
            if (toggleBtn) {
                toggleBtn.classList.add('pulse');
            }
        }, 3000);

        // Add entrance animation to chat container
        const chatContainer = document.querySelector('.platfo-chat-container');
        if (chatContainer) {
            chatContainer.style.opacity = '0';
            chatContainer.style.transform = 'translateY(20px)';
            chatContainer.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                chatContainer.style.opacity = '1';
                chatContainer.style.transform = 'translateY(0)';
            }, 2000);
        }
    }

    toggleChat() {
        const chatBox = document.getElementById('platfoChatBox');
        const toggleBtn = document.getElementById('platfoChatToggle');
        
        if (!chatBox) return;

        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            chatBox.classList.add('show');
            toggleBtn.classList.remove('pulse');
            // Focus on input field
            setTimeout(() => {
                const inputField = document.getElementById('platfoChatInput');
                if (inputField) inputField.focus();
            }, 300);
        } else {
            chatBox.classList.remove('show');
        }
    }

    closeChat() {
        const chatBox = document.getElementById('platfoChatBox');
        if (chatBox) {
            chatBox.classList.remove('show');
            this.isOpen = false;
        }
    }

    addWelcomeMessage() {
        // Welcome message is already in HTML, just ensure it's visible
        this.scrollToBottom();
    }

    sendMessage() {
        const inputField = document.getElementById('platfoChatInput');
        const message = inputField.value.trim();

        if (!message || this.isTyping) return;

        // Add user message
        this.addMessage(message, 'user');
        
        // Clear input
        inputField.value = '';
        this.updateSendButton();

        // Show typing indicator
        this.showTypingIndicator();

        // Generate AI response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000); // Random delay for realism
    }

    addMessage(content, sender) {
        const messagesContainer = document.getElementById('platfoChatMessages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `platfo-message platfo-${sender}-message`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'platfo-message-content';

        // Format content if it contains HTML
        if (content.includes('<') && content.includes('>')) {
            contentDiv.innerHTML = content;
        } else {
            contentDiv.innerHTML = `<p>${this.escapeHtml(content)}</p>`;
        }

        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);

        // Store in chat history
        this.chatHistory.push({ content, sender, timestamp: new Date() });

        this.scrollToBottom();
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('platfoChatMessages');
        if (!messagesContainer) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'platfo-typing-indicator show';
        typingDiv.id = 'typingIndicator';

        typingDiv.innerHTML = `
            <div class="platfo-typing-dots">
                <div class="platfo-typing-dot"></div>
                <div class="platfo-typing-dot"></div>
                <div class="platfo-typing-dot"></div>
            </div>
        `;

        messagesContainer.appendChild(typingDiv);
        this.isTyping = true;
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isTyping = false;
    }

    updateSendButton() {
        const inputField = document.getElementById('platfoChatInput');
        const sendBtn = document.getElementById('platfoChatSend');
        
        if (!inputField || !sendBtn) return;

        const hasText = inputField.value.trim().length > 0;
        sendBtn.disabled = !hasText || this.isTyping;
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('platfoChatMessages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Web Development Topics
        if (message.includes('html') || message.includes('hypertext')) {
            return this.getHtmlResponse();
        }
        
        if (message.includes('css') || message.includes('styling')) {
            return this.getCssResponse();
        }
        
        if (message.includes('javascript') || message.includes('js')) {
            return this.getJavaScriptResponse();
        }
        
        if (message.includes('responsive') || message.includes('mobile')) {
            return this.getResponsiveResponse();
        }
        
        if (message.includes('portfolio') || message.includes('website')) {
            return this.getPortfolioResponse();
        }
        
        if (message.includes('med') || message.includes('vonjoson') || message.includes('services')) {
            return this.getServicesResponse();
        }
        
        if (message.includes('learn') || message.includes('tutorial') || message.includes('course')) {
            return this.getLearningResponse();
        }
        
        if (message.includes('project') || message.includes('build') || message.includes('create')) {
            return this.getProjectResponse();
        }
        
        if (message.includes('design') || message.includes('ui') || message.includes('ux')) {
            return this.getDesignResponse();
        }
        
        if (message.includes('framework') || message.includes('library')) {
            return this.getFrameworkResponse();
        }
        
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return this.getGreetingResponse();
        }
        
        if (message.includes('help') || message.includes('what can you do')) {
            return this.getHelpResponse();
        }
        
        // Default response
        return this.getDefaultResponse();
    }

    getHtmlResponse() {
        return `
            <p><strong>HTML (HyperText Markup Language)</strong> is the foundation of web development!</p>
            <p>Key concepts:</p>
            <ul>
                <li>Semantic HTML5 elements</li>
                <li>Accessibility (ARIA labels)</li>
                <li>SEO optimization</li>
                <li>Form validation</li>
            </ul>
            <p>Med Vonjoson specializes in creating clean, semantic HTML structures that enhance user experience and search engine visibility.</p>
        `;
    }

    getCssResponse() {
        return `
            <p><strong>CSS (Cascading Style Sheets)</strong> brings your websites to life!</p>
            <p>Modern CSS features:</p>
            <ul>
                <li>Flexbox & Grid layouts</li>
                <li>CSS Custom Properties (variables)</li>
                <li>Animations & Transitions</li>
                <li>Media queries for responsiveness</li>
            </ul>
            <p>Med creates stunning, responsive designs using advanced CSS techniques and modern frameworks.</p>
        `;
    }

    getJavaScriptResponse() {
        return `
            <p><strong>JavaScript</strong> makes websites interactive and dynamic!</p>
            <p>Essential JavaScript concepts:</p>
            <ul>
                <li>ES6+ features (arrow functions, destructuring)</li>
                <li>DOM manipulation</li>
                <li>Async/await and Promises</li>
                <li>Event handling</li>
            </ul>
            <p>Med develops robust JavaScript applications with modern frameworks like React, Vue.js, and vanilla JS.</p>
        `;
    }

    getResponsiveResponse() {
        return `
            <p><strong>Responsive Web Design</strong> ensures your site works on all devices!</p>
            <p>Key principles:</p>
            <ul>
                <li>Mobile-first approach</li>
                <li>Flexible grid systems</li>
                <li>Scalable images and media</li>
                <li>Touch-friendly interfaces</li>
            </ul>
            <p>Med creates fully responsive websites that provide optimal user experience across desktop, tablet, and mobile devices.</p>
        `;
    }

    getPortfolioResponse() {
        return `
            <p><strong>Portfolio Development</strong> showcases your skills effectively!</p>
            <p>Portfolio essentials:</p>
            <ul>
                <li>Clean, professional design</li>
                <li>Showcase of best projects</li>
                <li>Clear contact information</li>
                <li>Fast loading times</li>
            </ul>
            <p>Med Vonjoson can help you create a stunning portfolio website that highlights your achievements and attracts potential clients or employers.</p>
        `;
    }

    getServicesResponse() {
        return `
            <p><strong>Med Vonjoson's Services:</strong></p>
            <ul>
                <li>Full-Stack Web Development</li>
                <li>Responsive Website Design</li>
                <li>E-commerce Solutions</li>
                <li>Portfolio Website Creation</li>
                <li>Web Application Development</li>
                <li>UI/UX Design</li>
            </ul>
            <p>Contact Med at <strong>+23278091467</strong> or through the contact form to discuss your project needs!</p>
        `;
    }

    getLearningResponse() {
        return `
            <p><strong>Learning Web Development</strong> - Here are some great resources:</p>
            <ul>
                <li>MDN Web Docs (official documentation)</li>
                <li>FreeCodeCamp (free courses)</li>
                <li>Codecademy (interactive learning)</li>
                <li>YouTube tutorials</li>
                <li>GitHub (open source projects)</li>
            </ul>
            <p>Med recommends starting with HTML/CSS basics, then moving to JavaScript. Practice by building small projects!</p>
        `;
    }

    getProjectResponse() {
        return `
            <p><strong>Starting a Web Project?</strong> Here's a roadmap:</p>
            <ul>
                <li>Define project goals and target audience</li>
                <li>Create wireframes and mockups</li>
                <li>Choose appropriate technologies</li>
                <li>Develop responsive design</li>
                <li>Test across different devices</li>
                <li>Deploy and maintain</li>
            </ul>
            <p>Med Vonjoson can guide you through the entire development process from concept to deployment!</p>
        `;
    }

    getDesignResponse() {
        return `
            <p><strong>Web Design Principles:</strong></p>
            <ul>
                <li>User-centered design approach</li>
                <li>Consistent color schemes and typography</li>
                <li>Intuitive navigation</li>
                <li>Fast loading times</li>
                <li>Accessibility compliance</li>
            </ul>
            <p>Med creates beautiful, functional designs that prioritize user experience and conversion optimization.</p>
        `;
    }

    getFrameworkResponse() {
        return `
            <p><strong>Popular Web Frameworks:</strong></p>
            <ul>
                <li><strong>Frontend:</strong> React, Vue.js, Angular</li>
                <li><strong>Backend:</strong> Node.js, Express, Django</li>
                <li><strong>CSS:</strong> Bootstrap, Tailwind CSS, Sass</li>
                <li><strong>Full-stack:</strong> Next.js, Nuxt.js</li>
            </ul>
            <p>Med works with modern frameworks to build scalable, maintainable web applications efficiently.</p>
        `;
    }

    getGreetingResponse() {
        return `
            <p>Hello! 👋 I'm Platfo.med, your AI assistant for web development and portfolio building.</p>
            <p>I can help you with:</p>
            <ul>
                <li>Web technologies (HTML, CSS, JavaScript)</li>
                <li>Portfolio creation strategies</li>
                <li>Med Vonjoson's services</li>
                <li>Learning resources and tutorials</li>
            </ul>
            <p>What would you like to know about web development?</p>
        `;
    }

    getHelpResponse() {
        return `
            <p><strong>I can help you with:</strong></p>
            <ul>
                <li>HTML, CSS, and JavaScript questions</li>
                <li>Responsive web design</li>
                <li>Portfolio website creation</li>
                <li>Web development best practices</li>
                <li>Learning resources and tutorials</li>
                <li>Med Vonjoson's services and expertise</li>
                <li>Project planning and development</li>
            </ul>
            <p>Just ask me anything about web development, and I'll provide helpful information!</p>
        `;
    }

    getDefaultResponse() {
        const responses = [
            "That's an interesting question! While I specialize in web development topics, I'd be happy to help with HTML, CSS, JavaScript, portfolio building, or Med Vonjoson's services. Could you rephrase your question?",
            "I'm focused on web development and portfolio building topics. Try asking about HTML, CSS, JavaScript, responsive design, or Med's services!",
            "Great question! I'm here to help with web development topics. Ask me about coding, design, portfolio creation, or Med Vonjoson's expertise!",
            "I'd love to help! I specialize in web development topics like HTML, CSS, JavaScript, responsive design, and portfolio building. What specific aspect interests you?"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Initialize the chat when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new PlatfoChat();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PlatfoChat;
}
