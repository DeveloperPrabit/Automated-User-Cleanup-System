// src/app/page.tsx
'use client';

import { useCleanupReports } from '@/hooks/useCleanupReports';

export default function Home() {
  const { latestReport, allReports, loading, error, message, triggerCleanup } = useCleanupReports();

  return (
    <div className="p-5 font-sans">
      <h1 className="text-3xl font-bold mb-6">User Cleanup System</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}
      
      {message && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          {message}
        </div>
      )}
      
      <div className="mb-6 p-4 border border-gray-300 rounded-lg">
        <h2 className="text-2xl font-semibold mb-3">Latest Cleanup Report</h2>
        {latestReport ? (
          <div className="space-y-2">
            <p><strong>Timestamp:</strong> {new Date(latestReport.timestamp).toLocaleString()}</p>
            <p><strong>Users Deleted:</strong> {latestReport.users_deleted}</p>
            <p><strong>Active Users Remaining:</strong> {latestReport.active_users_remaining}</p>
          </div>
        ) : (
          <p>No cleanup reports available</p>
        )}
        
        <button 
          onClick={triggerCleanup} 
          disabled={loading}
          className={`mt-3 px-4 py-2 rounded text-white ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Processing...' : 'Trigger Cleanup'}
        </button>
      </div>

      <div className="p-4 border border-gray-300 rounded-lg">
        <h2 className="text-2xl font-semibold mb-3">All Cleanup Reports</h2>
        {allReports.length > 0 ? (
          <div className="space-y-4">
            {allReports.map((report) => (
              <div key={report.id} className="p-3 border border-gray-200 rounded">
                <h3 className="text-lg font-medium">Report #{report.id}</h3>
                <p><strong>Timestamp:</strong> {new Date(report.timestamp).toLocaleString()}</p>
                <p><strong>Users Deleted:</strong> {report.users_deleted}</p>
                <p><strong>Active Users Remaining:</strong> {report.active_users_remaining}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No cleanup reports available</p>
        )}
      </div>
    </div>
  );
}