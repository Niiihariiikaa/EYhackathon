import React, { useState, useEffect } from 'react';
import { generateForecastData } from './forecastData';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const ClaimForecastPage = () => {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    // Generate mock data when the component mounts
    const data = generateForecastData();
    setForecastData(data);
  }, []);

  if (!forecastData) {
    return <div>Loading...</div>;
  }

  const { predictedClaims, totalPredictedClaims, peakHour } = forecastData;

  // Prepare data for Line Chart (Predicted Claims over next 7 days)
  const lineChartData = {
    labels: predictedClaims.map((item) => item.day),
    datasets: [
      {
        label: 'Predicted Claims ($)',
        data: predictedClaims.map((item) => item.claimAmount),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Prepare data for Bar Chart (Number of Claims for Peak Hours)
  const barChartData = {
    labels: ['0:00', '6:00', '12:00', '18:00', '24:00'],
    datasets: [
      {
        label: 'Number of Claims per Hour',
        data: [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), Math.floor(Math.random() * 50)],
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Claim Forecasting</h1>

      <div style={styles.cardContainer}>
        {/* Card 1: Predicted Claims for Next 7 Days */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>Predicted Claims for Next 7 Days</div>
          <div style={styles.cardBody}>{totalPredictedClaims.toFixed(2)} Claims</div>
        </div>

        {/* Card 2: Peak Hour */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>Peak Hour for Claims</div>
          <div style={styles.cardBody}>{peakHour}:00 Hours</div>
        </div>

        {/* Card 3: Claim Forecast Insights */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>Claim Forecast Insights</div>
          <div style={styles.cardBody}>
            The predicted claim volume is expected to increase over the next week, peaking at {peakHour}:00.
          </div>
        </div>
      </div>

      {/* Graphs Section */}
      <div style={styles.graphSection}>
        <div style={styles.graphCard}>
          <h2 style={styles.graphTitle}>Predicted Claims Over 7 Days</h2>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
        <div style={styles.graphCard}>
          <h2 style={styles.graphTitle}>Claim Trends for Peak Hours</h2>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>

      {/* Display Daily Forecast Data */}
      <div style={styles.forecastTable}>
        <h2 style={styles.tableTitle}>Daily Forecast Data</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Day</th>
              <th>Claim Amount</th>
              <th>Number of Claims</th>
            </tr>
          </thead>
          <tbody>
            {predictedClaims.map((item, index) => (
              <tr key={index}>
                <td>{item.day}</td>
                <td>{item.claimAmount}</td>
                <td>{item.numClaims}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Graphs Options
const lineChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Predicted Claims for the Next 7 Days',
      font: {
        size: 18,
        weight: 'bold',
        family: 'Poppins, sans-serif',
      },
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
    y: {
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
};

const barChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Claim Trends in Peak Hours',
      font: {
        size: 18,
        weight: 'bold',
        family: 'Poppins, sans-serif',
      },
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
    y: {
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
};

const styles = {
  container: {
    fontFamily: 'Poppins, sans-serif',
    padding: '40px 20px',
    flexWrap: 'Wrap',
    maxWidth: '1000px',
    margin: '0 auto',
    
    justifyContent: 'space-between',
    backgroundColor: '#dde7f2',
    borderRadius: '10px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
    position:'relative',
    marginLeft:'20px',
    marginTop:'50px',
  },
  heading: {
    fontSize: '2.5em',
    textAlign: 'center',
    
    marginBottom: '30px',
    fontWeight: 'bold',
    color:'#0562ce',
  },
  cardContainer: {
    width:'1000px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },
  card: {
    border: '1px solid #ddd',
    padding: '20px',
    margin: '10px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '30%',
    background: 'linear-gradient(145deg, #ffffff, #f1f1f1)',
    transition: 'all 0.3s ease',
    textAlign: 'center',
  },
  cardHeader: {
    fontSize: '1.4em',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: 'rgb(236 139 24)',
  },
  cardBody: {
    fontSize: '1.2em',
    color: 'rgb(10 0 0)',
  },
  graphSection: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '40px',
    gap: '20px',
  },
  graphCard: {
    width: '48%',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '15px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  graphTitle: {
    fontSize: '1.8em',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: 'rgb(236 139 24)',
  },
  
    forecastTable: {
      margin: '20px auto',
      padding: '20px',
      maxWidth: '600px',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    tableTitle: {
      textAlign: 'center',
      marginBottom: '10px',
      fontSize: '1.5rem',
      color: '#0562ce',
      fontWeight: 'bold',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      textAlign: 'left', // Align text to the left for proper indentation
    },
    tableHead: {
      backgroundColor: '#007BFF',
      color: '#fff',
      fontSize: '1rem',
      fontWeight: 'bold',
    },
    tableRow: {
      borderBottom: '1px solid #ddd',
    },
    tableCell: {
      padding: '10px',
      fontSize: '0.9rem',
      color: '#555',
    },
    evenRow: {
      backgroundColor: '#f5f5f5',
    },
    oddRow: {
      backgroundColor: '#ffffff',
    },
    
  
  

};

export default ClaimForecastPage;
