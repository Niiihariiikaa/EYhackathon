import React, { useState } from "react";

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    // Display user's message
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: userInput },
    ]);

    let chatbotReply = "";

    // Handle custom questions
    if (userInput.toLowerCase().includes("how does your ai solution help")) {
      chatbotReply =
        "Our AI solution helps by automating follow-ups, scheduling callbacks based on priority, providing client sentiment analysis, predicting claim trends, detecting fraud, and enabling multilingual support. This makes the entire claim processing more accurate, faster, and efficient for both BPO agents and clients.";
    } else if (userInput.toLowerCase().includes("what kind of internships")) {
      chatbotReply =
        "We offer internships that provide freshers with practical experience in the insurance industry. These internships also give an opportunity to work on AI and language training, boosting both career growth and skill development.";
    } else {
      const response = await fetch("http://localhost:5001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await response.json();
      chatbotReply = data.reply;
    }

    // Display chatbot's reply
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "chatbot", text: chatbotReply },
    ]);

    // Clear input field
    setUserInput("");
  };

  return (
    <>
      <div style={styles.chatbotIcon} onClick={toggleChat}>
        <div style={styles.bounce}></div>
      </div>

      {isChatOpen && (
        <div style={styles.chatbotContainer}>
          <div style={styles.chatWindow}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={
                  msg.sender === "user"
                    ? styles.userMessage
                    : styles.chatbotMessage
                }
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              style={styles.input}
              placeholder="Ask something..."
            />
            <button onClick={sendMessage} style={styles.sendButton}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Styles for the chatbot UI
const styles = {
  chatbotIcon: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "50px",
    height: "50px",
    backgroundColor: "#4CAF50",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 1000,
    animation: "bounce 2s infinite",
  },
  bounce: {
    width: "20px",
    height: "20px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    animation: "bounce 2s infinite",
  },
  chatbotContainer: {
    position: "fixed",
    bottom: "80px",
    right: "20px",
    width: "300px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    padding: "15px",
    zIndex: 1000,
  },
  chatWindow: {
    maxHeight: "300px",
    overflowY: "auto",
    marginBottom: "10px",
  },
  userMessage: {
    padding: "10px",
    backgroundColor: "#d1f7c4",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  chatbotMessage: {
    padding: "10px",
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  sendButton: {
    marginLeft: "10px",
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

// Add keyframes for bounce animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`,
  styleSheet.cssRules.length
);

export default Chatbot;
