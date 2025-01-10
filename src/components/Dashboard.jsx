import React from 'react';
import { Card, CardContent } from './ui/Card'; // Adjusted to correct relative path
import { BellAlert } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    { title: 'Pending Callbacks', value: '12', color: 'text-blue-500' },
    { title: "Today's Tasks", value: '8', color: 'text-gray-700' },
    { title: 'Performance Score', value: '92%', color: 'text-green-500' },
    { title: 'Fraud Alerts', value: '2', color: 'text-red-500' },
  ];

  const claims = [
    { id: 'CLM001', customer: 'John Doe', type: 'Auto', amount: '$5,000', status: 'Pending' },
  ];

  return (
    <main className="main-content">
      <header className="top-bar">
        <h1>Welcome, Agent</h1>
        <div className="notifications">
          <BellAlert size={20} />
          <span className="notification-badge">3</span>
        </div>
      </header>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <Card key={index} className="stat-card">
            <CardContent>
              <h3>{stat.title}</h3>
              <p className={stat.color}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="recent-claims">
        <CardContent>
          <h2>Recent Claims</h2>
          <table>
            <thead>
              <tr>
                <th>Claim ID</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim.id}>
                  <td>{claim.id}</td>
                  <td>{claim.customer}</td>
                  <td>{claim.type}</td>
                  <td>{claim.amount}</td>
                  <td>{claim.status}</td>
                  <td>
                    <button className="btn-action">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </main>
  );
};

export default Dashboard;
