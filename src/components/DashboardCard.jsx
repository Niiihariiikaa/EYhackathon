const DashboardCard = ({ title, value, color = 'text-blue-500' }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);