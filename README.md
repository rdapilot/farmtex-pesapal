# Farmtex Fullstack - Agricultural Trading Platform with AI Chat

A comprehensive agricultural trading platform for Uganda farmers with integrated ChatGPT AI assistant.

## Project Structure

```
farmtex-fullstack/
├── backend/                 # Node.js/Express API with Google Gemini AI integration
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   ├── .env                # Environment variables (Gemini API key)
│   └── README.md           # Backend documentation
└── farmtex-pesapal/        # React TypeScript frontend
    ├── src/
    │   ├── components/
    │   │   ├── ChatDrawer.tsx        # AI chat interface
    │   │   ├── FloatingChatButton.tsx # Chat trigger button
    │   │   └── ... (other components)
    │   └── App.tsx          # Main app with chat integration
    └── package.json         # Frontend dependencies
```

## Features

### Frontend
- **React TypeScript** with Vite build system
- **Tailwind CSS** for styling
- **Responsive Design** optimized for mobile and desktop
- **Real-time Chat Interface** with AI assistant
- **Floating Chat Button** with star icon trigger
- **Trading Pages** with Pesapal payment integration

### Backend
- **Node.js/Express** RESTful API
- **Google Gemini AI Integration** for fast, efficient agricultural assistance
- **Rate Limiting** to prevent API abuse
- **CORS Support** for frontend integration
- **Security Headers** with Helmet.js
- **Error Handling** and logging

### AI Assistant Features
- Agricultural trading advice
- Crop management guidance
- Market insights and pricing
- Platform navigation help
- Conversation memory within sessions

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
```

Make sure your Gemini API key is configured in `backend/.env`:
```
GEMINI_API_KEY=your_actual_api_key
```

Start the backend server:
```bash
npm run dev
```
Backend will run on http://localhost:5000

### 2. Frontend Setup

```bash
cd farmtex-pesapal
npm install
npm run dev
```
Frontend will run on http://localhost:5173

## Usage

1. **Access the Platform**: Open http://localhost:5173
2. **Chat with AI**: Click the star icon in the bottom-right corner
3. **Ask Questions**: Get help with farming, trading, and platform features
4. **Browse Features**: Explore the trading platform and payment integration

## API Endpoints

### Backend API
- `GET /api/health` - Health check
- `POST /api/chat` - Chat with AI assistant

### Example Chat Request
```json
{
  "message": "What's the best time to plant maize in Uganda?",
  "conversationHistory": [
    {"role": "user", "content": "Previous message"},
    {"role": "assistant", "content": "Previous response"}
  ]
}
```

## Chat Interface

### Features
- **Real-time messaging** with typing indicators
- **Conversation history** maintained during session
- **Mobile-responsive** sliding drawer
- **Error handling** with connection status
- **Agricultural context** - AI trained for farming assistance

### Usage
- Click the **star icon** to open chat
- Type messages about farming, trading, or platform help
- Press **Enter** to send, **Shift+Enter** for new lines
- Chat drawer slides in from the right side

## Development

### Running Both Services
1. **Terminal 1** (Backend):
   ```bash
   cd backend && npm run dev
   ```

2. **Terminal 2** (Frontend):
   ```bash
   cd farmtex-pesapal && npm run dev
   ```

### Environment Variables

#### Backend (.env)
```
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Security Features

- **Rate limiting**: 20 requests per 15 minutes per IP for chat
- **CORS protection**: Configured for frontend domain
- **Input validation**: Message content validation
- **Error handling**: Secure error responses
- **API key protection**: Environment variable storage

## Customization

### AI Assistant Behavior
Modify the system prompt in `backend/server.js` to customize the AI's responses and focus areas.

### Chat UI
Customize the chat interface by modifying:
- `src/components/ChatDrawer.tsx` - Main chat interface
- `src/components/FloatingChatButton.tsx` - Trigger button

### Styling
All styles use Tailwind CSS classes and can be customized in the component files.

## Troubleshooting

### Common Issues

1. **Chat not working**: Ensure backend is running on port 5000
2. **Gemini API errors**: Check API key in backend/.env
3. **CORS errors**: Ensure frontend URL matches in backend CORS config
4. **Port conflicts**: Check if ports 5000 and 5173 are available

### Testing the Setup

1. **Backend Health**: Visit http://localhost:5000/api/health
2. **Frontend Loading**: Visit http://localhost:5173
3. **Chat Function**: Click star icon and send a test message

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## License

This project is licensed under the MIT License.
