import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: 'Too many chat requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to chat endpoint
app.use('/api/chat', chatLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Farmtex Backend API'
  });
});

// Chat endpoint for Gemini AI integration
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // System prompt for agricultural context
    const systemPrompt = `You are an AI assistant for Farmtex Hub, an agricultural trading platform in Uganda. You help farmers with:
      
      1. Trading advice and market insights
      2. Crop management and farming techniques
      3. Price information and market trends
      4. Platform navigation and features
      5. Agricultural best practices
      
      Keep responses helpful, concise, and focused on agriculture and trading. Always be encouraging and supportive to farmers. If asked about topics outside agriculture or trading, politely redirect the conversation back to farming-related topics.
      
      Current platform features include:
      - Direct farmer-to-buyer trading
      - WhatsApp trading groups
      - SMS-based trading
      - AI price insights
      - Real-time market data
      - Commission-free trading periods for early adopters
      
      Please provide helpful, accurate responses about agriculture and farming in Uganda.`;

    // Build conversation context
    let conversationContext = systemPrompt + '\n\n';
    
    // Add recent conversation history (last 5 exchanges to keep context manageable)
    const recentHistory = conversationHistory.slice(-10);
    for (const msg of recentHistory) {
      if (msg.role === 'user') {
        conversationContext += `User: ${msg.content}\n`;
      } else if (msg.role === 'assistant') {
        conversationContext += `Assistant: ${msg.content}\n`;
      }
    }
    
    conversationContext += `User: ${message}\nAssistant: `;

    const result = await model.generateContent(conversationContext);
    const response = await result.response;
    const reply = response.text();

    res.json({
      success: true,
      reply: reply,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Handle specific Gemini API errors
    if (error.message && error.message.includes('API_KEY')) {
      return res.status(500).json({ 
        error: 'Gemini API authentication failed. Please check API key configuration.' 
      });
    }
    
    if (error.message && error.message.includes('quota')) {
      return res.status(429).json({ 
        error: 'Gemini API quota exceeded. Please try again later.' 
      });
    }

    if (error.message && error.message.includes('rate limit')) {
      return res.status(429).json({ 
        error: 'Gemini API rate limit exceeded. Please try again later.' 
      });
    }

    res.status(500).json({ 
      error: 'Failed to process chat request. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /api/health',
      'POST /api/chat'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Farmtex Backend API running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`🤖 Using Google Gemini AI`);
  
  if (!process.env.GEMINI_API_KEY) {
    console.warn('⚠️  WARNING: GEMINI_API_KEY not set in environment variables');
  } else {
    console.log('✅ Gemini API key configured');
  }
});
