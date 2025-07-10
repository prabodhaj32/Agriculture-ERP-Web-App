export interface DashboardStats {
  totalFields: number;
  activeWorkers: number;
  todaysHarvestKg: number;
  fertilizerUsedKg: number;
}

export interface WeatherInfo {
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  rain?: number;
}

export interface UpcomingTask {
  title: string;
  type: 'harvest' | 'watering' | 'fertilizing';
  dueDate: Date;
  assignedField: string;
  assignedWorker: string;
}