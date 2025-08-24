// src/services/api.ts
import axios from 'axios';
import { CleanupReport, CleanupResponse } from '@/types/cleanup';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const cleanupApi = {
  // Get the latest cleanup report
  getLatestReport: async (): Promise<CleanupReport> => {
    const response = await api.get<CleanupReport>('/reports/latest/');
    return response.data;
  },

  // Get all cleanup reports
  getAllReports: async (): Promise<CleanupReport[]> => {
    const response = await api.get<CleanupReport[]>('/reports/');
    return response.data;
  },

  // Trigger a cleanup
  triggerCleanup: async (): Promise<CleanupResponse> => {
    const response = await api.post<CleanupResponse>('/cleanup/trigger/');
    return response.data;
  },
};