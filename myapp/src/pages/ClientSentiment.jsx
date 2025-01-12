import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';
import { CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Modal from 'react-modal';

// Chart.js registration
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Modal setup
Modal.setAppElement("#root");

const ClientSentiment = () => {
  const [sentimentData, setSentimentData] = useState([]);
  const [newConversation, setNewConversation] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/mock-sentiment-data')
      .then(response => {
        setSentimentData(response.data);
      })
      .catch(error => {
        console.error('Error fetching sentiment data:', error);
      });
  }, []);

  const handleSentimentAnalysis = () => {
    axios.post('http://localhost:5000/api/sentiment-analysis', { conversation: newConversation })
      .then(response => {
        setSentiment(response.data.sentiment);
      })
      .catch(error => {
        console.error('Error analyzing sentiment:', error);
      });
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Positive':
        return '#27AE60'; // Soft green for positive sentiment
      case 'Negative':
        return '#E74C3C'; // Red for negative sentiment
      case 'Neutral':
        return '#BDC3C7'; // Gray for neutral sentiment
      default:
        return '#7F8C8D'; // Default color
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Mock Data with names and dates
  const mockSentimentData = [
    { id: 1, name: 'Alice Johnson', sentiment: 'Positive', conversation: 'The service was amazing! I felt heard and supported.', date: '2025-01-09' },
    { id: 2, name: 'John Doe', sentiment: 'Neutral', conversation: 'I think the product is okay, but it could use some improvements.', date: '2025-01-08' },
    { id: 3, name: 'Sarah Lee', sentiment: 'Negative', conversation: 'I’m disappointed with the experience. It didn’t meet my expectations.', date: '2025-01-07' },
    { id: 4, name: 'Michael Smith', sentiment: 'Positive', conversation: 'Fantastic experience! I will definitely recommend to others.', date: '2025-01-06' },
    { id: 5, name: 'Emily Davis', sentiment: 'Negative', conversation: 'The product is defective, and I am unhappy with the service.', date: '2025-01-05' },
  ];

  // Chart data for trends
  const data = {
    labels: ['2025-01-09', '2025-01-08', '2025-01-07', '2025-01-06', '2025-01-05'],
    datasets: [
      {
        label: 'Sentiment Trends',
        data: [1, 0, -1, 1, -1], // Positive(1), Neutral(0), Negative(-1)
        borderColor: '#3498DB', // Professional Blue for trend line
        backgroundColor: '#3498DB',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <div style={styles.leftPanel}>
          <h2 style={styles.heading}>Sentiment Analysis</h2>

          {/* New Conversation Input */}
          <div style={styles.conversationInputBox}>
            <textarea
              value={newConversation}
              onChange={(e) => setNewConversation(e.target.value)}
              rows="6"
              placeholder="Type conversation here..."
              style={styles.textarea}
            />
            <button onClick={handleSentimentAnalysis} style={styles.analyzeButton}>Analyze Sentiment</button>
            {sentiment && <p style={{ ...styles.sentimentResult, color: getSentimentColor(sentiment) }}>Sentiment: {sentiment}</p>}
          </div>

          {/* Previous Analysis */}
          <div style={styles.dataTable}>
            <h3>Previous Sentiment Analysis</h3>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Conversation</th>
                  <th>Sentiment</th>
                </tr>
              </thead>
              <tbody>
                {mockSentimentData.map((item) => (
                  <tr key={item.id} style={{ ...styles.tableRow, backgroundColor: getSentimentColor(item.sentiment) }}>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td>{item.conversation}</td>
                    <td>{item.sentiment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel with Cards and Chart */}
        <div style={styles.rightPanel}>
          <div style={styles.cardWrapper}>
            <div style={styles.card}>
              <h3>Positive Sentiments</h3>
              <p>50%</p>
            </div>
            <div style={styles.card}>
              <h3>Neutral Sentiments</h3>
              <p>30%</p>
            </div>
            <div style={styles.card}>
              <h3>Negative Sentiments</h3>
              <p>20%</p>
            </div>
          </div>

          <div style={styles.chartWrapper}>
            <h3>Sentiment Trend</h3>
            <Line data={data} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#ECF0F1', // Light gray background
  },
  mainContent: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
  },
  leftPanel: {
    flex: 0.6,
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  rightPanel: {
    flex: 0.4,
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#2C3E50', // Professional Blue
  },
  conversationInputBox: {
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #BDC3C7', // Gray border for professionalism
    fontSize: '16px',
    marginBottom: '15px',
    boxSizing: 'border-box',
  },
  analyzeButton: {
    padding: '12px 24px',
    backgroundColor: '#3498DB', // Professional Blue
    color: 'white',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  sentimentResult: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  dataTable: {
    marginTop: '30px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  tableHeader: {
    backgroundColor: '#2C3E50',
    color: '#ffffff',
    textAlign: 'left',
    padding: '12px',
  },
  tableRow: {
    fontSize: '14px',
    textAlign: 'left',
    padding: '12px',
  },
  cardWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '20px',
    marginBottom: '40px',
  },
  card: {
    padding: '20px',
    backgroundColor: 'white', // White background for the cards
    color: '#2C3E50', // Text color
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  chartWrapper: {
    marginTop: '30px',
    color:'rgb(44, 62, 80)',
  },

  
};

export default ClientSentiment;
