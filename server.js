const express = require("express");
const path = require("path");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Express app
const app = express();

// Configure Express
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Initialize Gemini API
const API_KEY = process.env.GEMINI_API_KEY; // Set this in your environment variables
const genAI = new GoogleGenerativeAI(API_KEY);

// Route to render the main page
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/mainindex",(req,res)=>{
    res.render("mainindex");
    
})
let a,b;
app.get("/login",(req,res)=>{
    res.render("Signin-Page")
})
app.post("/xyz",function abcd(req,res){
a=req.body.topicText
b=req.body.difficulty
    
   res.render("Game-Library",{title:a,difficulty:b})    
   

}
)
 


app.get("/snake",(req,res)=>{

    res.render("snake",{title:a,difficulty:b})
})
app.get("/hangman",(req,res)=>{
    res.render("hangman",{title:a,difficulty:b})
})
app.get("/tick",(req,res)=>{
    res.render("tic",{title:a,difficulty:b})
})
// API endpoint to send prompts to Gemini
app.post("/api/generate", async (req, res) => {
    try {
        const { prompt, model = "gemini-pro" } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }
        
        // Get the model
        const genModel = genAI.getGenerativeModel({ model });
        
        // Generate content
        const result = await genModel.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        res.json({ generated: text });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "Failed to generate content", details: error.message });
    }
});

// For text and image prompts (multimodal)
app.post("/api/generate/multimodal", async (req, res) => {
    try {
        const { prompt, imageUrls = [], model = "gemini-pro-vision" } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }
        
        // Get the model
        const genModel = genAI.getGenerativeModel({ model });
        
        // Prepare parts array with text and images
        const parts = [{ text: prompt }];
        
        // Add images if available
        for (const imageUrl of imageUrls) {
            try {
                // For base64 images
                if (imageUrl.startsWith('data:image')) {
                    const base64Data = imageUrl.split(',')[1];
                    parts.push({
                        inlineData: {
                            data: base64Data,
                            mimeType: imageUrl.split(';')[0].split(':')[1]
                        }
                    });
                } 
                // For regular URLs, handle as needed
                // Note: Direct URL processing may need additional handling
            } catch (imgError) {
                console.error("Error processing image:", imgError);
            }
        }
        
        // Generate content
        const result = await genModel.generateContent({ contents: [{ parts }] });
        const response = await result.response;
        const text = response.text();
        
        res.json({ generated: text });
    } catch (error) {
        console.error("Error generating multimodal content:", error);
        res.status(500).json({ 
            error: "Failed to generate multimodal content", 
            details: error.message 
        });
    }
});

// Chat history endpoint
app.post("/api/chat", async (req, res) => {
    try {
        const { messages, model = "gemini-pro" } = req.body;
        
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: "Valid messages array is required" });
        }
        
        // Get the model
        const genModel = genAI.getGenerativeModel({ model });
        
        // Start chat session
        const chat = genModel.startChat({
            history: messages.slice(0, -1).map(msg => ({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.content }]
            })),
        });
        
        // Get the last message to send
        const lastMessage = messages[messages.length - 1];
        
        // Send message and get response
        const result = await chat.sendMessage(lastMessage.content);
        const response = await result.response;
        const text = response.text();
        
        res.json({ 
            generated: text,
            role: "assistant"
        });
    } catch (error) {
        console.error("Error in chat:", error);
        res.status(500).json({ 
            error: "Failed to process chat", 
            details: error.message 
        });
    }
});

// New endpoint to generate quiz questions
app.get("/api/quiz", async (req, res) => {
    try {
        // Get topic from query parameters or default to C++
        const topic = req.query.topic || "C++";
        
        // Get the model
        const genModel = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        // Create prompt for generating a quiz question
        const prompt = `Create a multiple-choice quiz question about ${topic} programming. 
        Return the response in JSON format with the following structure:
        {
            "question": "The question text here",
            "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
            "answer": 0-3 (index of the correct answer)
        }`;
        
        // Generate content
        const result = await genModel.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        try {
            // Parse the response text as JSON
            const quizQuestion = JSON.parse(text);
            res.json(quizQuestion);
        } catch (parseError) {
            console.error("Error parsing AI response as JSON:", parseError);
            // Fallback to a default question if parsing fails
            res.json({
                question: `What is the extension of ${topic} source files?`,
                options: [".txt", ".cpp", ".js", ".py"],
                answer: topic.toLowerCase() === "c++" ? 1 : 0, 
                error: "Generated question failed to parse, using fallback"
            });
        }
    } catch (error) {
        console.error("Error generating quiz question:", error);
        res.status(500).json({ 
            error: "Failed to generate quiz question", 
            details: error.message 
        });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});