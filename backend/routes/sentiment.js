// backend-routes-sentiment.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const vader = require('vader-sentiment');

const app = express();
const PORT = 5000;

// Middleware to handle CORS
app.use(cors());
app.use(express.json());

// Mock data for the sentiment analysis (assuming data comes from a conversation with the agent)
const mockData = [
  { id: 1, conversation: "I'm really upset about how long this is taking! Why is my claim still not processed?", agentId: 101 },
  { id: 2, conversation: "Thanks for your help! The claim processing is so smooth, I appreciate your support!", agentId: 102 },
  { id: 3, conversation: "This issue is getting worse. I need this resolved immediately, it's urgent!", agentId: 101 },
  { id: 4, conversation: "Everything is fine, I don't have any complaints. I’m satisfied with the service.", agentId: 103 }
];

// Function to analyze sentiment using Vader Sentiment
function analyzeSentiment(text) {
  const result = vader.SentimentIntensityAnalyzer.polarity_scores(text);
  if (result.compound > 0) {
    return "Positive";
  } else if (result.compound < 0) {
    return "Negative";
  } else {
    return "Neutral";
  }
}

// Route for getting sentiment analysis of a conversation
app.post('/api/sentiment-analysis', (req, res) => {
  const { conversation } = req.body;
  const sentiment = analyzeSentiment(conversation);
  res.json({ sentiment });
});

// Route for getting all mock data for sentiment analysis
app.get('/api/mock-sentiment-data', (req, res) => {
  const results = mockData.map(item => ({
    id: item.id,
    conversation: item.conversation,
    sentiment: analyzeSentiment(item.conversation)
  }));
  res.json(results);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
