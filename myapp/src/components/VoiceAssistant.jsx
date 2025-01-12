import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceAssistant = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const navigate = useNavigate(); // For navigation

  // Command to route mapping
  const commandToRoute = {
    home: '/',
    'call back scheduling': '/features',
    'sentiment analysis': '/careers',
    'claim forecasting': '/contact',
    'internships and courses':'internship-courses',
    dashboard: '/dashboard',
  };

  // Voice Input using Web Speech API
  const startVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = document.getElementById('language').value;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const question = event.results[0][0].transcript.toLowerCase();
      setInput(question);
      handleVoiceCommand(question);
    };

    recognition.onerror = (event) => {
      alert('Voice recognition error: ' + event.error);
    };

    recognition.start();
  };

  // Handle Voice Commands
  const handleVoiceCommand = (command) => {
    // Check for navigation commands
    for (const key in commandToRoute) {
      if (command.includes(key)) {
        const route = commandToRoute[key];
        setResponse(`Navigating to ${key} page...`);
        speakResponse(`Navigating to ${key} page`);
        navigate(route); // Navigate to the route
        announcePageName(key); // Announce the page name
        return;
      }
    }

    // Fallback to sending the question to the backend
    sendQuestion(command);
  };

  // Announce Page Name
  const announcePageName = (pageName) => {
    const utterance = new SpeechSynthesisUtterance(`You are now on the ${pageName} page.`);
    utterance.lang = document.getElementById('language').value;
    speechSynthesis.speak(utterance);
  };

  // Send the recognized text to the backend
  const sendQuestion = (question) => {
    fetch('http://localhost:5000/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: question }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.response) {
          setChatHistory((prevHistory) => [
            ...prevHistory,
            { user: question, bot: data.response }, // Add to chat history
          ]);
          setResponse(data.response);
          speakResponse(data.response); // Speak the response
        } else {
          alert(data.error || 'An error occurred while processing your request.');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  // Update Chat History UI
  const updateChatHistoryUI = () => {
    return chatHistory.map((chat, index) => (
      <div key={index} style={{ marginBottom: '10px' }}>
        <p style={{ color: 'blue', fontWeight: 'bold' }}>User: {chat.user}</p>
        <p style={{ color: 'green', fontWeight: 'bold' }}>Bot: {chat.bot}</p>
      </div>
    ));
  };

  // Text-to-Speech for response
  const speakResponse = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = document.getElementById('language').value;
    speechSynthesis.speak(utterance);
  };

  // Stop the ongoing speech output
  const stopSpeech = () => {
    speechSynthesis.cancel();
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Voice Assistant</h1>

      <label htmlFor="language" style={{ display: 'block', marginBottom: '10px' }}>
        Select Language:
      </label>
      <select
        id="language"
        defaultValue="en-US"
        style={{ marginBottom: '20px', padding: '8px', width: '100%' }}
      >
        <option value="en-US">English (US)</option>
        <option value="hi-IN">Hindi (India)</option>
        <option value="es-ES">Spanish (Spain)</option>
        <option value="fr-FR">French (France)</option>
        <option value="de-DE">German (Germany)</option>
        <option value="zh-CN">Chinese (Mandarin)</option>
        <option value="ja-JP">Japanese</option>
        <option value="ar-SA">Arabic</option>
      </select>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={startVoiceInput}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          🎤 Speak
        </button>
        <button
          onClick={stopSpeech}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          🛑 Stop Output
        </button>
      </div>

      <input
        type="text"
        id="input"
        value={input}
        readOnly
        style={{
          marginBottom: '20px',
          padding: '10px',
          width: '100%',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
        placeholder="Your question"
      />

      <p id="response" style={{ marginBottom: '20px', fontWeight: 'bold', color: '#333' }}>
        {response}
      </p>

      <h2 style={{ marginBottom: '10px' }}>Chat History</h2>
      <div
        id="chat-history"
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          maxHeight: '200px',
          overflowY: 'auto',
          backgroundColor: '#f9f9f9',
          borderRadius: '5px',
        }}
      >
        {updateChatHistoryUI()}
      </div>
    </div>
  );
};

export default VoiceAssistant;
