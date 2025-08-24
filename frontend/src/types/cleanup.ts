export interface CleanupReport {
  id: number;
  timestamp: string;
  users_deleted: number;
  active_users_remaining: number;
}

export interface CleanupResponse {
  message: string;
  task_id: string;
}