export interface Task {
  id: string;
  field: string;
  taskType: string;
  assignedTo: string;
  startDate: string;
  endDate: string;
  notes: string;
  completed: boolean;
}
