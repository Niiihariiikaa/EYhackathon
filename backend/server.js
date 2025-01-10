const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const vader = require('vader-sentiment');

// Initialize app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Environment Variables
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with a secure key

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/callbackDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if the connection is successful
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Define schema for Users
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Create model for Users
const User = mongoose.model('User', userSchema);

// Define schema for Callback data
const callbackSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: String,
  time: String,
  claim_amount: Number,
});

// Create model for Callback data
const Callback = mongoose.model('Callback', callbackSchema);

// Middleware to verify JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// Register Route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'User registered successfully' });
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Generate JWT
  const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ message: 'Login successful', token });
});

// Protected Home Route
app.get('/home', authenticate, (req, res) => {
  res.status(200).json({ message: `Welcome to the Home page, ${req.user.username}!` });
});

// Callback Scheduling Route
app.post('/schedule', authenticate, async (req, res) => {
  const { name, phone, date, time, claim_amount } = req.body;

  const newCallback = new Callback({ name, phone, date, time, claim_amount });

  try {
    await newCallback.save();
    res.status(200).json({ message: 'Callback scheduled successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving callback' });
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
  res.send('Welcome to the Insurance Claims System');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

