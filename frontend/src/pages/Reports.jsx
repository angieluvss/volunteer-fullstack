// src/pages/Reports.jsx

import React from 'react';
import axios from 'axios';

const Reports = () => {
  const downloadReport = async (type, format) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:4000/api/reports/${type}/${format}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob', // Important for file downloads
        }
      );

      // Create a URL for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element
      const link = document.createElement('a');
      link.href = url;

      // Set the file name
      link.setAttribute('download', `${type}_report.${format}`);

      // Append to the document and trigger click
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Failed to download report');
    }
  };

  return (
    <div className="min-h-screen bg-white pt-32 flex flex-col items-center">
      <div className="w-full max-w-6xl px-8">
        <h2 className="text-5xl font-bold mb-8 text-red-600">Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Volunteers Report */}
          <div className="border p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Volunteers Report</h3>
            <button
              onClick={() => downloadReport('volunteers', 'pdf')}
              className="mr-4 px-6 py-2 bg-red-600 text-white rounded-lg"
            >
              Download PDF
            </button>
            <button
              onClick={() => downloadReport('volunteers', 'csv')}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg"
            >
              Download CSV
            </button>
          </div>
          {/* Events Report */}
          <div className="border p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Events Report</h3>
            <button
              onClick={() => downloadReport('events', 'pdf')}
              className="mr-4 px-6 py-2 bg-red-600 text-white rounded-lg"
            >
              Download PDF
            </button>
            <button
              onClick={() => downloadReport('events', 'csv')}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg"
            >
              Download CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;