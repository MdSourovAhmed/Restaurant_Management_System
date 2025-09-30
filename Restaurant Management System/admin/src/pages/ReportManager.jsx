import React, { useState } from 'react';
import api from "../utils/api";

const ReportManager = () => {
  const [report, setReport] = useState(null);

  const generateReport = async () => {
    try {
      const response = await api.get('/reports/daily-sales');
      setReport(response.data);
    } catch (err) {
      console.error(err);
      alert('Error generating report');
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Reports</h2>
      <button
        onClick={generateReport}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6"
      >
        Generate Daily Sales Report
      </button>
      {report && (
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Daily Sales Report</h3>
          <p>Total Sales: ${report.totalSales}</p>
          <p>Order Count: {report.orderCount}</p>
        </div>
      )}
    </div>
  );
};

export default ReportManager;