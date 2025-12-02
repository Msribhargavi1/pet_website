// AI Assistant with LLM Integration
class AIAssistant {
    constructor() {
        this.apiEndpoint = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';
        this.config = typeof AI_CONFIG !== 'undefined' ? AI_CONFIG : { aiService: 'local' };
        this.conversationHistory = [];
        this.petContext = this.buildPetContext();
    }

    buildPetContext() {
        return `You are an AI assistant for Cherry, a Golden Retriever dog. Here's important information about Cherry:
- Name: Cherry
- Breed: Golden Retriever
- Born: October 2021 in Anantapur
- Current Location: Tadipatri
- Medical Condition: Has Portosystemic Shunt (PSS) - requires special low-protein diet
- Recent Vaccinations: Immunity booster (November 2025), Rabies (April 2025)
- Veterinarian: Dr. Hussain at Government Hospital, Tadipatri (Contact: 8978833504)
- Diet: Special 7-day meal plan with chicken, fish, rice, sweet potato, vegetables. NO red meat, organ meat, or spicy foods.
- Treats: Various dog treats including Pedigree Dentastix, Kennel Kitchen products
- Daily Add-ons: Coconut oil (1 tsp), turmeric (pinch), blueberries (2 pieces 3x/week), fish oil capsule (2x/week), curd (2 tbsp)

Provide helpful, accurate advice about Cherry's health, diet, and care. For critical symptoms, always recommend immediate veterinary care.`;
    }

    async sendMessage(userMessage) {
        try {
            // Check which AI service to use
            if (this.config.aiService === 'openai' && this.config.openAIApiKey) {
                return await this.sendMessageOpenAI(userMessage);
            } else if (this.config.aiService === 'huggingface' && this.config.huggingFaceApiKey) {
                return await this.sendMessageHuggingFace(userMessage);
            } else {
                return this.getLocalResponse(userMessage);
            }
        } catch (error) {
            console.error('AI Error:', error);
            return this.getLocalResponse(userMessage);
        }
    }

    async sendMessageHuggingFace(userMessage) {
        try {
            if (!this.config.huggingFaceApiKey) {
                return this.getLocalResponse(userMessage);
            }

            // Prepare the conversation context
            const context = this.petContext + '\n\nUser: ' + userMessage + '\nAssistant:';

            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.huggingFaceApiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs: context,
                    parameters: {
                        max_length: 200,
                        temperature: 0.7,
                        top_p: 0.9,
                        do_sample: true
                    }
                })
            });

            if (!response.ok) {
                console.warn('API request failed, using local responses');
                return this.getLocalResponse(userMessage);
            }

            const data = await response.json();
            return data[0]?.generated_text || this.getLocalResponse(userMessage);

        } catch (error) {
            console.error('AI API Error:', error);
            return this.getLocalResponse(userMessage);
        }
    }

    getLocalResponse(message) {
        const msg = message.toLowerCase();
        
        // Diet related
        if (msg.includes('diet') || msg.includes('food') || msg.includes('eat') || msg.includes('meal')) {
            return "Cherry follows a special 7-day diet plan due to her PSS condition. The diet includes chicken, fish, rice, sweet potato, and vegetables. It's crucial to avoid red meat, organ meat (liver/kidney), and spicy foods. Each meal should be balanced with proper portions. Check the 7-Day Diet Chart section for detailed meal plans!";
        }
        
        // Vaccination related
        if (msg.includes('vaccine') || msg.includes('vaccination') || msg.includes('shot')) {
            return "Cherry's vaccination schedule is up to date. Her last immunity booster was in November 2025, and rabies vaccination in April 2025. Regular vaccinations are essential for her health. All vaccinations are done at Government Hospital, Tadipatri by Dr. Hussain. Check the Medical History section for complete vaccination records.";
        }
        
        // Weight and exercise
        if (msg.includes('weight') || msg.includes('exercise') || msg.includes('walk') || msg.includes('activity')) {
            return "Golden Retrievers like Cherry need regular exercise - at least 1-2 hours of daily activity including walks, playtime, and mental stimulation. Monitor her weight regularly as PSS can affect metabolism. Maintain a healthy weight through proper diet and exercise. Use the Growth Tracking section to log weight changes over time.";
        }
        
        // Symptoms and health
        if (msg.includes('symptom') || msg.includes('sick') || msg.includes('ill') || msg.includes('health') || msg.includes('vomit') || msg.includes('diarrhea')) {
            return "If Cherry shows any concerning symptoms like vomiting, diarrhea, lethargy, or loss of appetite, use the Symptoms Checker tool for assessment. For critical symptoms like difficulty breathing, seizures, or severe lethargy, contact Dr. Hussain immediately at 8978833504. Given her PSS condition, any digestive issues should be monitored closely.";
        }
        
        // PSS specific
        if (msg.includes('pss') || msg.includes('liver') || msg.includes('shunt') || msg.includes('portosystemic')) {
            return "Cherry has Portosystemic Shunt (PSS), a liver condition that requires special care. This means her diet must be low in protein and carefully managed. She's had PSS treatments in March 2025, October 2023, and April 2022. Always consult Dr. Hussain for PSS-related concerns. Monitor for symptoms like lethargy, vomiting, or behavioral changes, and maintain her special diet strictly.";
        }
        
        // Treats
        if (msg.includes('treat') || msg.includes('snack') || msg.includes('reward')) {
            return "Cherry can enjoy various dog treats including Pedigree Dentastix, Chicken Roast Strips, Chip Chops Chicken Tenders, and Kennel Kitchen products. However, given her PSS condition, treats should be given in moderation. Avoid high-protein treats and always check ingredients. The Treats section lists all approved treats for Cherry.";
        }
        
        // Medication
        if (msg.includes('medicine') || msg.includes('medication') || msg.includes('drug') || msg.includes('pill')) {
            return "For Cherry's medications, use the Medication Tracking section to log all medicines, dosages, and refill dates. Given her PSS condition, any new medications should be approved by Dr. Hussain. Keep track of medication schedules and set refill alerts to ensure you never run out.";
        }
        
        // Emergency
        if (msg.includes('emergency') || msg.includes('urgent') || msg.includes('critical') || msg.includes('help')) {
            return "⚠️ For emergencies, contact Dr. Hussain immediately at Government Hospital, Tadipatri: 8978833504. Critical symptoms requiring immediate attention include: difficulty breathing, seizures, severe vomiting/diarrhea, collapse, or extreme lethargy. Don't wait - get veterinary care right away!";
        }
        
        // Grooming
        if (msg.includes('groom') || msg.includes('bath') || msg.includes('brush') || msg.includes('fur') || msg.includes('coat')) {
            return "Golden Retrievers need regular grooming. Brush Cherry's coat 2-3 times per week to prevent matting and reduce shedding. Bathe her every 6-8 weeks or as needed. Check her ears weekly for infections, trim nails monthly, and brush teeth regularly. Cherry had shedding treatment in May 2022 with Dr. Hussain.";
        }
        
        // Training
        if (msg.includes('train') || msg.includes('behavior') || msg.includes('command') || msg.includes('obedience')) {
            return "Golden Retrievers are intelligent and eager to please, making them easy to train. Use positive reinforcement with treats (approved ones from the Treats section) and praise. Keep training sessions short (10-15 minutes) and consistent. Focus on basic commands, socialization, and mental stimulation through puzzle toys and games.";
        }
        
        // Age related
        if (msg.includes('age') || msg.includes('old') || msg.includes('puppy') || msg.includes('senior')) {
            return "Cherry was born in October 2021, making her around 4 years old. She's in her prime adult years. Golden Retrievers typically live 10-12 years. At this age, maintain regular vet checkups, proper diet, exercise, and monitor for any health changes. Her PSS condition requires ongoing management throughout her life.";
        }
        
        // General greeting
        if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('good morning') || msg.includes('good afternoon')) {
            return "Hello! I'm Cherry's AI health assistant. I can help you with information about her diet, vaccinations, PSS condition, symptoms, medications, and general care. What would you like to know about Cherry today?";
        }
        
        // Thank you
        if (msg.includes('thank') || msg.includes('thanks')) {
            return "You're welcome! I'm always here to help with Cherry's care. Feel free to ask me anything about her health, diet, or well-being anytime!";
        }
        
        // Default response
        return "I'm here to help with Cherry's health, diet, vaccinations, PSS condition, and general care. You can ask me about:\n• Diet and meal plans\n• Vaccination schedules\n• PSS management\n• Symptoms and health concerns\n• Exercise and weight\n• Medications\n• Grooming and training\n• Emergency contacts\n\nWhat would you like to know?";
    }

    // OpenAI API integration
    async sendMessageOpenAI(userMessage) {
        if (!this.config.openAIApiKey) {
            return this.getLocalResponse(userMessage);
        }

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.openAIApiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: this.petContext },
                        { role: 'user', content: userMessage }
                    ],
                    max_tokens: 200,
                    temperature: 0.7
                })
            });

            const data = await response.json();
            return data.choices[0]?.message?.content || this.getLocalResponse(userMessage);

        } catch (error) {
            console.error('OpenAI API Error:', error);
            return this.getLocalResponse(userMessage);
        }
    }
}

// Initialize AI Assistant
const aiAssistant = new AIAssistant();

// Update the sendMessage function to use the AI Assistant
async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        const chatMessages = document.getElementById('chatMessages');
        
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'user-message';
        userMsg.textContent = message;
        chatMessages.appendChild(userMsg);
        
        input.value = '';
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'bot-message typing-indicator';
        typingIndicator.textContent = 'Typing...';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Get AI response
        const response = await aiAssistant.sendMessage(message);
        
        // Remove typing indicator
        typingIndicator.remove();
        
        // Add bot response
        const botMsg = document.createElement('div');
        botMsg.className = 'bot-message';
        botMsg.textContent = response;
        chatMessages.appendChild(botMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}
