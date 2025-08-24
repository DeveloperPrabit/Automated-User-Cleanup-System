import { useState, useEffect } from 'react';
import { CleanupReport, CleanupResponse } from '@/types/cleanup';
import { cleanupApi } from '@/services/api';

export const useCleanupReports = () => {
  const [latestReport, setLatestReport] = useState<CleanupReport | null>(null);
  const [allReports, setAllReports] = useState<CleanupReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchLatestReport = async () => {
    try {
      const report = await cleanupApi.getLatestReport();
      setLatestReport(report);
      setError(null);
    } catch (err) {
      console.error('Error fetching latest report:', err);
      // Don't set error for latest report as it might not exist initially
    }
  };

  const fetchAllReports = async () => {
    try {
      const reports = await cleanupApi.getAllReports();
      setAllReports(reports);
      setError(null);
    } catch (err) {
      console.error('Error fetching all reports:', err);
      // Don't set error for all reports as the endpoint might not be available
    }
  };

  const triggerCleanup = async (): Promise<boolean> => {
    setLoading(true);
    setMessage(null);
    try {
      const response: CleanupResponse = await cleanupApi.triggerCleanup();
      setMessage(response.message);
      
      // Refresh reports after a short delay
      setTimeout(() => {
        fetchLatestReport();
        fetchAllReports();
      }, 2000);
      
      return true;
    } catch (err) {
      setError('Failed to trigger cleanup');
      console.error('Error triggering cleanup:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestReport();
    fetchAllReports();
  }, []);

  return {
    latestReport,
    allReports,
    loading,
    error,
    message,
    triggerCleanup,
    refreshReports: () => {
      fetchLatestReport();
      fetchAllReports();
    },
  };
};