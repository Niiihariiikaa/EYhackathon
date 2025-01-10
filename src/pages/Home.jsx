import React from 'react';
import { Package, FileText, Globe, TrendingUp, Search } from 'lucide-react';
import './Home.css'

// Mock data for recent claims
const recentClaims = [
  { claimId: 'C12345', customer: 'John Doe', type: 'Auto', amount: '$1200', status: 'Pending' },
  { claimId: 'C12346', customer: 'Jane Smith', type: 'Home', amount: '$5000', status: 'Approved' },
  { claimId: 'C12347', customer: 'Alice Brown', type: 'Health', amount: '$2500', status: 'Denied' },
  { claimId: 'C12348', customer: 'Bob White', type: 'Auto', amount: '$800', status: 'Approved' },
];

// StatsCard Component
const StatsCard = ({ title, value, icon }) => (
  <div className="stats-card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:translate-y-1 transition-all w-full sm:w-64 lg:w-80">
    <div className="icon mb-4">{icon}</div>
    <h3 className="stats-title text-lg font-semibold text-gray-700">{title}</h3>
    <p className="stats-value text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

// Recent Claims Table Component
const RecentClaimsTable = () => (
  <div className="recent-claims overflow-x-auto bg-white shadow-sm rounded-lg mt-6">
    <table className="tble min-w-full table-auto">
      <thead>
        <tr className="border-b">
          <th className="py-3 px-6 text-left">Claim ID</th>
          <th className="py-3 px-6 text-left">Customer</th>
          <th className="py-3 px-6 text-left">Type</th>
          <th className="py-3 px-6 text-left">Amount</th>
          <th className="py-3 px-6 text-left">Status</th>
          <th className="py-3 px-6 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {recentClaims.map((claim) => (
          <tr key={claim.claimId} className="border-b hover:bg-gray-50">
            <td className="py-3 px-6">{claim.claimId}</td>
            <td className="py-3 px-6">{claim.customer}</td>
            <td className="py-3 px-6">{claim.type}</td>
            <td className="py-3 px-6">{claim.amount}</td>
            <td className="py-3 px-6">{claim.status}</td>
            <td className="py-3 px-6">
              <button className="text-blue-500">View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Main Home Component
const Home = () => {
  return (
    <div className="flex">
      {/* Sidebar (Fixed width) */}
      <div className="w-64 bg-gray-800 text-white h-screen p-6">
        <div className="text-center font-semibold text-xl mb-6">Insurance Claims Hub</div>
      </div>

      {/* Main Content (Full width excluding sidebar) */}
      <div className="flex-1 p-6 overflow-hidden">
        {/* Header with Floating Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-6">
          <StatsCard title="Pending Callbacks" value="12" icon={<Package className="h-5 w-5 text-blue-600" />} />
          <StatsCard title="Today's Tasks" value="8" icon={<FileText className="h-5 w-5 text-green-600" />} />
          <StatsCard title="Performance Score" value="92%" icon={<TrendingUp className="h-5 w-5 text-yellow-600" />} />
          <StatsCard title="Fraud Alerts" value="2" icon={<Search className="h-5 w-5 text-red-600" />} />
        </div>

        {/* Recent Claims Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Claims</h2>
          <RecentClaimsTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
