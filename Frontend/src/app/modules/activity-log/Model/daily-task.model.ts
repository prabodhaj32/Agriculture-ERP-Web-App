export interface DailyTask {
  field: string;
  taskType: string;
  workerName: string;
  duration: number;
  remarks?: string;
  date: string;        // 📅 ISO Date string (e.g., 2025-07-13)
  photos?: string[];   // base64 strings for image preview
}