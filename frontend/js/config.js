// AI Assistant Configuration
// Add your API keys here to enable LLM integration

const AI_CONFIG = {
    // Hugging Face API (Free tier available)
    // Get your API key from: https://huggingface.co/settings/tokens
    huggingFaceApiKey: '',
    
    // OpenAI API (Paid service)
    // Get your API key from: https://platform.openai.com/api-keys
    openAIApiKey: '',
    
    // Choose which AI service to use: 'local', 'huggingface', or 'openai'
    // 'local' uses built-in responses (no API key needed)
    // 'huggingface' uses Hugging Face Inference API (free tier available)
    // 'openai' uses OpenAI GPT models (requires paid API key)
    aiService: 'local'
};

// Instructions for setting up AI integration:
// 
// 1. For Hugging Face (Free):
//    - Go to https://huggingface.co/settings/tokens
//    - Create a new token
//    - Copy the token and paste it in huggingFaceApiKey above
//    - Set aiService to 'huggingface'
//
// 2. For OpenAI (Paid):
//    - Go to https://platform.openai.com/api-keys
//    - Create a new API key
//    - Copy the key and paste it in openAIApiKey above
//    - Set aiService to 'openai'
//
// 3. For Local (No API needed):
//    - Keep aiService as 'local'
//    - Uses built-in intelligent responses based on Cherry's data
