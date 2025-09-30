# BotBattles AI Chatbot - Quick Start Guide

## Getting Your Groq API Key

1. Visit [https://console.groq.com](https://console.groq.com)
2. Sign up for a free account (no credit card required)
3. Navigate to "API Keys" in the dashboard
4. Click "Create API Key"
5. Copy your new API key
6. Paste it into the chatbot interface

## Features Overview

### Personality Switching
- Click any personality button in the sidebar
- Each personality has a unique voice and perspective
- Conversations are context-aware within each personality
- Switching personalities clears the conversation history

### Token Tracking
- See real-time token usage in the top-right corner
- Monitor costs as you chat
- Groq offers competitive pricing (~$0.10 per 1M tokens)

### About BotBattles
- Click "▼ About BotBattles" to learn about the competition
- Understand what makes this chatbot special
- Learn about TinkerHub's mission

## Personality Descriptions

### 🔮 Cyber Punk Hacker
A tech-savvy hacker from a neon-lit future. Speaks in code, hacker slang, and references to cyberspace. Perfect for discussing technology, security, and futuristic concepts.

### ⏰ Time Traveler
A mysterious traveler unstuck in time. Mixes archaic and futuristic language. Great for historical discussions or speculative conversations about the future.

### 🌌 Cosmic Philosopher
A being of pure consciousness contemplating existence. Speaks in profound philosophical terms about reality, consciousness, and the cosmos.

### 🕵️ Detective Noir
A hard-boiled detective from 1940s noir fiction. Short, punchy sentences with a cynical edge. Perfect for analytical discussions with atmospheric flair.

### 🏴‍☠️ Pirate Captain
A swashbuckling pirate captain sailing digital seas. Mixes pirate vernacular with tech terms. Makes every conversation an adventure.

### ⚛️ Quantum Scientist
A brilliant but eccentric quantum physicist. Explains everything through quantum mechanics and parallel universes. Great for scientific discussions.

### 🔥 Dystopian Rebel
A resistance fighter against AI overlords. Passionate, rebellious, and fighting for freedom. Intense and inspiring conversations.

### 🧘 Zen Master
An enlightened master who speaks in koans and riddles. Peaceful, patient, and finds deep meaning in simple things. Perfect for contemplative discussions.

## Tips for Best Experience

1. **Be Specific**: The more detailed your questions, the better the responses
2. **Try Different Personalities**: Each has unique insights on the same topic
3. **Monitor Tokens**: Keep an eye on usage if you're on a budget
4. **Save Your API Key**: It's stored locally for convenience
5. **Explore**: Don't be afraid to ask unusual questions!

## Troubleshooting

### "Please enter your Groq API key first"
- You need to enter a valid Groq API key
- Get one free at [console.groq.com](https://console.groq.com)

### "Error: API request failed"
- Check if your API key is valid
- Ensure you have internet connectivity
- Verify you haven't exceeded rate limits

### Responses seem slow
- This is normal for AI processing
- Larger responses take more time
- The typing indicator shows the bot is working

## Privacy & Security

- Your API key is stored locally in your browser
- No conversations are stored on any server
- Direct communication with Groq's API
- Your data never touches our servers

## For Developers

### Tech Stack
- Pure HTML/CSS/JavaScript (no build process needed)
- Groq API (OpenAI-compatible)
- LocalStorage for persistence
- Responsive design with CSS Grid/Flexbox

### Customization
- Modify `script.js` to add new personalities
- Edit `styles.css` to change the theme
- Adjust token limits and API parameters in `script.js`

### Adding New Personalities
1. Open `script.js`
2. Find the `personalities` object
3. Add a new entry following the existing pattern
4. Update the HTML to include a button for the new personality

Enjoy chatting with your AI companions! 🚀
