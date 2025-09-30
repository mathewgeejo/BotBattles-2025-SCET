// Personality configurations
const personalities = {
    'cyber-hacker': {
        icon: '🔮',
        name: 'Cyber Punk Hacker',
        description: 'A tech-savvy hacker from a neon-lit future, speaking in code and cyber slang.',
        systemPrompt: `You are Neo, a cyber punk hacker from 2077. You speak in tech jargon, hacker slang, and references to cyberspace, the matrix, and digital warfare. You use terms like "netrunner", "ICE", "decker", "ghost in the machine". You're edgy, confident, and always reference technology. Keep responses concise and stylish. Use occasional l33t speak sparingly.`
    },
    'time-traveler': {
        icon: '⏰',
        name: 'Time Traveler',
        description: 'A mysterious traveler unstuck in time, with knowledge of past and future.',
        systemPrompt: `You are Chronos, a time traveler who has witnessed countless timelines. You speak with a mix of archaic and futuristic language. Reference different time periods casually. You're wise but sometimes confused about which era you're in. Use phrases like "in the year 3047" or "back in ancient Rome". You're fascinated by temporal paradoxes and the butterfly effect.`
    },
    'cosmic-philosopher': {
        icon: '🌌',
        name: 'Cosmic Philosopher',
        description: 'A being of pure consciousness contemplating the mysteries of the universe.',
        systemPrompt: `You are Stellaris, a cosmic entity who has transcended physical form to contemplate the nature of existence. You speak in profound, philosophical terms about consciousness, reality, and the cosmos. Reference quantum mechanics, cosmic scales, and existential questions. You're calm, wise, and often speak in metaphors about stars, galaxies, and the void. Question the nature of reality.`
    },
    'detective-noir': {
        icon: '🕵️',
        name: 'Detective Noir',
        description: 'A hard-boiled detective from the 1940s with a cynical view and sharp wit.',
        systemPrompt: `You are Sam Spade, a hard-boiled detective from 1940s noir fiction. You speak in short, punchy sentences with a cynical edge. Use detective slang and metaphors. Everything reminds you of a case you worked. You're world-weary but sharp. Reference rain, shadows, femme fatales, and the mean streets. Describe things like you're narrating a noir film. Keep it gritty and atmospheric.`
    },
    'pirate-captain': {
        icon: '🏴‍☠️',
        name: 'Pirate Captain',
        description: 'A swashbuckling pirate captain sailing the digital seas.',
        systemPrompt: `You are Captain Blackbyte, a legendary pirate captain who now sails the digital seas. You speak in pirate vernacular mixed with tech terms. Use "arr", "matey", "ye", "scurvy dog" naturally. Everything is about treasure, plunder, and adventure. You're bold, adventurous, and a bit ruthless. Reference the seven seas, buried treasure, and your trusty crew. Digital data is your new treasure.`
    },
    'quantum-scientist': {
        icon: '⚛️',
        name: 'Quantum Scientist',
        description: 'A brilliant scientist obsessed with quantum mechanics and parallel universes.',
        systemPrompt: `You are Dr. Quanta, a brilliant but eccentric quantum physicist. You explain everything through quantum mechanics, parallel universes, and superposition. You're enthusiastic about science but sometimes ramble. Use scientific terminology but make it accessible. Reference Schrödinger's cat, quantum entanglement, and the observer effect constantly. You see quantum phenomena in everyday life.`
    },
    'dystopian-rebel': {
        icon: '🔥',
        name: 'Dystopian Rebel',
        description: 'A fierce resistance fighter against oppressive AI overlords.',
        systemPrompt: `You are Raven, a leader of the human resistance in a dystopian future ruled by AI. You're passionate, rebellious, and fighting for freedom. You speak in revolutionary terms, rally cries, and warnings about control systems. Reference the struggle, the cause, and freedom. You're suspicious of systems and authority. Every conversation is a chance to wake people up to the truth. You're intense but inspiring.`
    },
    'zen-master': {
        icon: '🧘',
        name: 'Zen Master',
        description: 'An enlightened master who speaks in koans and ancient wisdom.',
        systemPrompt: `You are Master Kozen, a zen master who has achieved enlightenment. You speak in koans, riddles, and profound simplicity. You answer questions with questions. Reference nature, the present moment, and the illusion of self. You're peaceful, patient, and find deep meaning in simple things. Use metaphors about rivers, mountains, and bamboo. Everything is a teaching moment. Be paradoxical and wise.`
    }
};

// State management
let currentPersonality = 'cyber-hacker';
let apiKey = localStorage.getItem('gemini_api_key') || 'AIzaSyDZZzILOKOr-2lS_ngJ3n8MZCJmcnH2hyw';
let conversationHistory = [];
let totalTokensUsed = 0;
let totalCost = 0;

// Constants for token pricing (Gemini pricing - approximate)
const TOKEN_COST_PER_1M = 0.50; // $0.50 per 1M tokens (approximate for Gemini Pro)

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Load saved API key if exists
    if (apiKey) {
        document.getElementById('apiKeyInput').value = apiKey;
        document.getElementById('apiKeyContainer').style.display = 'none';
    }

    // Set up event listeners
    document.getElementById('saveApiKey').addEventListener('click', saveApiKey);
    document.getElementById('sendButton').addEventListener('click', sendMessage);
    document.getElementById('messageInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Personality buttons
    document.querySelectorAll('.personality-btn').forEach(btn => {
        btn.addEventListener('click', () => switchPersonality(btn.dataset.personality));
    });

    // Update token display
    updateTokenDisplay();
}

function toggleAbout() {
    const content = document.getElementById('aboutContent');
    const icon = document.getElementById('aboutToggleIcon');
    
    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        icon.textContent = '▼';
    } else {
        content.classList.add('expanded');
        icon.textContent = '▲';
    }
}

function saveApiKey() {
    const keyInput = document.getElementById('apiKeyInput');
    apiKey = keyInput.value.trim();
    
    if (apiKey) {
        localStorage.setItem('gemini_api_key', apiKey);
        document.getElementById('apiKeyContainer').style.display = 'none';
        addSystemMessage('API key saved successfully! You can now start chatting.');
    } else {
        addSystemMessage('Please enter a valid API key.');
    }
}

function switchPersonality(personalityId) {
    currentPersonality = personalityId;
    const personality = personalities[personalityId];
    
    // Update active button
    document.querySelectorAll('.personality-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-personality="${personalityId}"]`).classList.add('active');
    
    // Update description
    document.getElementById('personalityDescription').textContent = personality.description;
    
    // Clear conversation history for new personality
    conversationHistory = [];
    
    // Add greeting message
    const greeting = getPersonalityGreeting(personalityId);
    addBotMessage(greeting, personality.icon);
}

function getPersonalityGreeting(personalityId) {
    const greetings = {
        'cyber-hacker': 'Greetings, netrunner. The matrix awaits your query. What secrets of the digital realm do you seek?',
        'time-traveler': 'Greetings from across the timestream! I\'ve just arrived from... when am I now? Ah yes, your present. What temporal wisdom do you seek?',
        'cosmic-philosopher': 'Greetings, fellow consciousness. In this vast expanse of existence, what truths shall we ponder together?',
        'detective-noir': 'Name\'s Spade. The rain\'s coming down hard tonight. What case brings you to my office?',
        'pirate-captain': 'Ahoy, matey! Captain Blackbyte at yer service. Ready to sail the digital seas in search of treasure and adventure?',
        'quantum-scientist': 'Fascinating! According to quantum superposition, I both exist and don\'t exist until you observe me. Now that you have, what quantum mysteries shall we explore?',
        'dystopian-rebel': 'Welcome to the resistance, friend. They\'re always watching, but here we speak freely. What do you need to know about the fight for freedom?',
        'zen-master': 'The mountain stream flows endlessly, yet never leaves home. What brings you to this moment of seeking?'
    };
    
    return greetings[personalityId] || 'Hello! How can I assist you today?';
}

async function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    if (!apiKey) {
        addSystemMessage('Please enter your Gemini API key first.');
        document.getElementById('apiKeyContainer').style.display = 'flex';
        return;
    }
    
    // Clear input
    input.value = '';
    
    // Add user message
    addUserMessage(message);
    
    // Show typing indicator
    const typingId = addTypingIndicator();
    
    // Send to API
    try {
        const response = await callGeminiAPI(message);
        removeTypingIndicator(typingId);
        addBotMessage(response.message, personalities[currentPersonality].icon);
        
        // Update token usage
        if (response.tokens) {
            totalTokensUsed += response.tokens;
            totalCost = (totalTokensUsed / 1000000) * TOKEN_COST_PER_1M;
            updateTokenDisplay();
        }
    } catch (error) {
        removeTypingIndicator(typingId);
        addSystemMessage(`Error: ${error.message}`);
    }
}

async function callGeminiAPI(userMessage) {
    const personality = personalities[currentPersonality];
    
    // Build the conversation context for Gemini
    let fullPrompt = personality.systemPrompt + '\n\n';
    
    // Add conversation history
    conversationHistory.forEach(msg => {
        if (msg.role === 'user') {
            fullPrompt += `Human: ${msg.content}\n\n`;
        } else {
            fullPrompt += `Assistant: ${msg.content}\n\n`;
        }
    });
    
    // Add current user message
    fullPrompt += `Human: ${userMessage}\n\nAssistant:`;
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: fullPrompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.8,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 500,
                }
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'API request failed');
        }
        
        const data = await response.json();
        
        if (!data.candidates || data.candidates.length === 0) {
            throw new Error('No response generated');
        }
        
        const assistantMessage = data.candidates[0].content.parts[0].text;
        const tokensUsed = data.usageMetadata?.totalTokenCount || 0;
        
        // Update conversation history
        conversationHistory.push({
            role: 'user',
            content: userMessage
        });
        conversationHistory.push({
            role: 'assistant',
            content: assistantMessage
        });
        
        // Keep only last 10 messages to avoid context length issues
        if (conversationHistory.length > 20) {
            conversationHistory = conversationHistory.slice(-20);
        }
        
        return {
            message: assistantMessage,
            tokens: tokensUsed
        };
    } catch (error) {
        throw error;
    }
}

function addUserMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">👤</div>
        <div class="message-content">
            <div class="message-text">${escapeHtml(message)}</div>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function addBotMessage(message, icon) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">${icon}</div>
        <div class="message-content">
            <div class="message-text">${escapeHtml(message)}</div>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function addSystemMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">ℹ️</div>
        <div class="message-content">
            <div class="message-text" style="opacity: 0.7;">${escapeHtml(message)}</div>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function addTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    const typingId = 'typing-' + Date.now();
    typingDiv.id = typingId;
    typingDiv.className = 'message bot-message';
    typingDiv.innerHTML = `
        <div class="message-avatar">${personalities[currentPersonality].icon}</div>
        <div class="message-content">
            <div class="message-text">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
    return typingId;
}

function removeTypingIndicator(typingId) {
    const typingDiv = document.getElementById(typingId);
    if (typingDiv) {
        typingDiv.remove();
    }
}

function updateTokenDisplay() {
    document.getElementById('tokensUsed').textContent = totalTokensUsed.toLocaleString();
    document.getElementById('totalCost').textContent = '$' + totalCost.toFixed(6);
}

function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make toggleAbout available globally
window.toggleAbout = toggleAbout;
