import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './DashboardCard.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Dummy data for illustration
  const data = {
    totalCalls: 500,
    averageHandleTime: 7.2,
    activeAgents: 15,
    totalRevenue: 25000,
  };

  // Dummy day-wise data for graph
  const [dayData, setDayData] = useState({
    callsAnswered: [10, 20, 25, 30, 35, 40, 50], // Calls answered each day (for example)
    revenueGenerated: [1000, 2000, 1500, 2500, 3000, 3500, 4000], // Revenue generated each day
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], // Days of the week
  });

  useEffect(() => {
    // You can replace the below with an actual data fetching logic
    setDayData({
      callsAnswered: [30, 20, 25, 50, 35, 40, 15],
      revenueGenerated: [3000, 2000, 1500, 5000, 3000, 3500, 3000],
      daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    });
  }, []);

  // Line chart data
  const callsAnsweredChartData = {
    labels: dayData.daysOfWeek,
    datasets: [
      {
        label: 'Calls Answered',
        data: dayData.callsAnswered,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const revenueGeneratedChartData = {
    labels: dayData.daysOfWeek,
    datasets: [
      {
        label: 'Revenue Generated (₹)',
        data: dayData.revenueGenerated,
        fill: false,
        borderColor: 'rgba(255, 159, 64, 1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Performance Overview (Day-wise)',
      },
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>BPO Dashboard</h1>
        <p>Welcome to the BPO Dashboard. Here you can monitor performance metrics in real-time.</p>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h3>Total Calls</h3>
          <p>{data.totalCalls}</p>
        </div>
        <div className="stat-card">
          <h3>Average Handle Time</h3>
          <p>{data.averageHandleTime} mins</p>
        </div>
        <div className="stat-card">
          <h3>Active Agents</h3>
          <p>{data.activeAgents}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>₹{data.totalRevenue}</p>
        </div>
      </div>

      <div className="chart-section">
        <h3>Performance Overview</h3>

        {/* Day-wise chart for Calls Answered */}
        <div className="chart-container">
          <Line data={callsAnsweredChartData} options={chartOptions} />
        </div>

        {/* Day-wise chart for Revenue Generated */}
        <div className="chart-container">
          <Line data={revenueGeneratedChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
