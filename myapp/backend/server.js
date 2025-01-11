require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { TextServiceClient } = require('@google-ai/generativelanguage'); // Import Google's Generative AI client
const vader = require('vader-sentiment');

// Initialize app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Environment Variables
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Google API Key from .env

// Initialize Google's Generative AI client
const client = new TextServiceClient({
  apiKey: GOOGLE_API_KEY, // Pass the API key here
});

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/callbackDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Define schema for Callback data
const callbackSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: String,
  time: String,
  claim_amount: Number,
});

const Callback = mongoose.model('Callback', callbackSchema);

// Function to communicate with Gemini API using @google/generative-ai
async function getGeminiResponse(input) {
  try {
    const response = await client.generateText({
      model: 'gemini-pro', // Use Google's text model
      prompt: {
        text: input,
      },
    });

    return response.candidates[0]?.output || 'No response generated.';
  } catch (error) {
    console.error('Error communicating with Gemini API:', error.message);
    throw error;
  }
}

// Callback Scheduling Route
app.post('/schedule', async (req, res) => {
  const { name, phone, date, time, claim_amount } = req.body;

  // Check if phone number is exactly 10 digits
  if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ message: 'Phone number must be exactly 10 digits.' });
  }

  // Calculate priority based on claim amount (Higher claim amount gets higher priority)
  const priority = claim_amount >= 10000 ? 1 : claim_amount >= 5000 ? 2 : 3;

  // Create a new callback entry
  const newCallback = new Callback({ name, phone, date, time, claim_amount });

  try {
    await newCallback.save();
    res.status(200).json({ message: 'Callback scheduled successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving callback', error: error.message });
  }
});

// Route to fetch all scheduled callbacks
app.get('/callbacks', async (req, res) => {
  try {
    const callbacks = await Callback.find(); // Fetch all callbacks from the database

    // Sort callbacks by date proximity, claim amount, and priority
    const sortedCallbacks = callbacks.sort((a, b) => {
      const todayDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      const diffA = Math.abs(new Date(a.date) - new Date(todayDate));
      const diffB = Math.abs(new Date(b.date) - new Date(todayDate));

      // Sort by date proximity (ascending)
      if (diffA !== diffB) return diffA - diffB;

      // Sort by claim amount (descending)
      if (a.claim_amount !== b.claim_amount) return b.claim_amount - a.claim_amount;

      // Sort by priority (ascending, lower priority number is higher priority)
      return a.priority - b.priority;
    });

    res.status(200).json(sortedCallbacks); // Respond with the sorted callback data
  } catch (error) {
    res.status(500).json({ message: 'Error fetching callbacks', error: error.message });
  }
});

// Gemini AI Response Route
app.post('/api/gemini', async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: 'No input provided' });
  }

  try {
    const botResponse = await getGeminiResponse(input);
    res.json({ response: botResponse });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch a response from Gemini AI' });
  }
});

// Route to handle text input from Voice Assistant
app.post('/ask', async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: 'No input provided' });
  }

  try {
    const botResponse = await getGeminiResponse(input);
    res.json({ response: botResponse });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch a response from Gemini AI' });
  }
});

// Route to delete a callback by its ID
app.delete('/callbacks/:id', async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    // Try to find and delete the callback using findByIdAndDelete
    const callback = await Callback.findByIdAndDelete(id);

    if (!callback) {
      return res.status(404).json({ message: 'Callback not found' });
    }

    res.status(200).json({ message: 'Callback marked as done and deleted successfully' });
  } catch (error) {
    console.error('Error during callback deletion:', error);
    res.status(500).json({ message: 'Error deleting callback', error: error.message });
  }
});
// Sentiment Analysis Route
app.post('/api/sentiment-analysis', (req, res) => {
  const { conversation } = req.body;
  const sentiment = analyzeSentiment(conversation);
  res.json({ sentiment });
});

// Mock Sentiment Data Route
app.get('/api/mock-sentiment-data', (req, res) => {
  const results = mockData.map((item) => ({
    id: item.id,
    conversation: item.conversation,
    sentiment: analyzeSentiment(item.conversation),
  }));
  res.json(results);
});

// Function to analyze sentiment using Vader Sentiment
function analyzeSentiment(text) {
  const result = vader.SentimentIntensityAnalyzer.polarity_scores(text);
  if (result.compound > 0) {
    return 'Positive';
  } else if (result.compound < 0) {
    return 'Negative';
  } else {
    return 'Neutral';
  }
}

// Mock data for sentiment analysis
const mockData = [
  { id: 1, conversation: "I'm really upset about how long this is taking! Why is my claim still not processed?", agentId: 101 },
  { id: 2, conversation: 'Thanks for your help! The claim processing is so smooth, I appreciate your support!', agentId: 102 },
  { id: 3, conversation: 'This issue is getting worse. I need this resolved immediately, it\'s urgent!', agentId: 101 },
  { id: 4, conversation: "Everything is fine, I don't have any complaints. I’m satisfied with the service.", agentId: 103 },
];

// Example existing route
app.get('/', (req, res) => {
  res.send('Welcome to the Voice Assistant System');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
