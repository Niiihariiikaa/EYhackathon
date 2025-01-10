import React, { useState, useEffect } from 'react';
import { FaMicrophoneAlt, FaStop } from 'react-icons/fa';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceAssistant = () => {
  const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [language, setLanguage] = useState('en-US');

  // Function to speak the response
  const speakResponse = (message, lang = 'en-US') => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = lang; // Set language for speech synthesis
    window.speechSynthesis.speak(speech);
  };

  // Start listening when button is clicked
  const handleVoiceAssistant = () => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: true, language: language });
    } else {
      alert('Your browser does not support speech recognition.');
    }
  };

  // Stop listening
  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  // Switch language for both voice recognition and output
  const switchLanguage = (lang) => {
    setLanguage(lang);
    if (listening) {
      SpeechRecognition.stopListening();
      SpeechRecognition.startListening({ continuous: true, language: lang });
    }
  };

  // Handle transcript commands
  useEffect(() => {
    if (transcript.toLowerCase().includes("schedule callback")) {
      speakResponse("Scheduling callback for you.");
    } else if (transcript.toLowerCase().includes("fraud detected")) {
      speakResponse("Fraud detection initiated.");
    } else if (transcript.toLowerCase().includes("client sentiment")) {
      speakResponse("Analyzing client sentiment.");
    }
    // Add more voice commands as needed
  }, [transcript]);

  return (
    <div className="voice-assistant-container">
      <h1 className="voice-assistant-heading">Voice Assistant</h1>
      <div className="voice-assistant-ui">
        <button onClick={handleVoiceAssistant} className="voice-assistant-btn">
          <FaMicrophoneAlt size={30} />
        </button>
        <button onClick={handleStopListening} className="voice-assistant-btn stop-btn">
          <FaStop size={30} />
        </button>
        <div>
          {listening ? <p>Listening...</p> : <p>Click the microphone to start listening</p>}
        </div>
        <p><strong>Transcript:</strong> {transcript}</p>
        <div className="language-switcher">
          <button onClick={() => switchLanguage('en-US')}>English</button>
          <button onClick={() => switchLanguage('hi-IN')}>Hindi</button>
          <button onClick={() => switchLanguage('mr-IN')}>Marathi</button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
