# Farmtex Backend API

Backend API for Farmtex Hub with Google Gemini AI integration for agricultural assistance.

## Features

- **Google Gemini AI Integration**: Fast, efficient AI-powered agricultural assistance
- **Rate Limiting**: Prevents API abuse with configurable limits
- **CORS Support**: Configured for frontend integration
- **Security**: Helmet.js for security headers
- **Environment Configuration**: Easy setup with environment variables

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start the Server**
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns server status and timestamp

### Chat with AI
- **POST** `/api/chat`
- **Body**: 
  ```json
  {
    "message": "Your question about farming or trading",
    "conversationHistory": [
      {"role": "user", "content": "Previous message"},
      {"role": "assistant", "content": "Previous response"}
    ]
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "reply": "AI response",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
  ```

## Rate Limiting

- Chat endpoint: 20 requests per 15 minutes per IP
- Customizable in `server.js`

## Security Features

- Helmet.js for security headers
- CORS configuration
- Request size limiting (10MB)
- Error handling middleware
- Input validation

## Development

The server includes comprehensive error handling and logging for development and debugging.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Required |
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5173 |
