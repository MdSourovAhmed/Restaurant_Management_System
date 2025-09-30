import React from 'react';

const Reports = () => {
  const generateReport = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reports/daily-sales');
      const data = await response.json();
      alert(`Daily Sales: ${data.totalSales}, Orders: ${data.orderCount}`);
    } catch (err) {
      console.error(err);
      alert('Error generating report');
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Daily Sales Report</h2>
      <button
        onClick={generateReport}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Generate Report
      </button>
    </div>
  );
};

export default Reports;