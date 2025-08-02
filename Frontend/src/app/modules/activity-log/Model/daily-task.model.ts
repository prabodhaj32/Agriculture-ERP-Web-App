export interface DailyTask {
  field: string;
  taskType: string;
  workerName: string;
  duration: number;
  remarks?: string;
  date: string;       
  photos?: string[];   
}