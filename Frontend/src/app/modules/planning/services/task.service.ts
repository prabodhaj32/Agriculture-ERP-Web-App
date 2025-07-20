import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      this.tasksSubject.next(JSON.parse(saved));
    } else {
      // If no saved tasks, load mock tasks
      const mockTasks = this.generateMockTasks();
      this.tasksSubject.next(mockTasks);
      this.save();
    }
  }

  addTask(task: Task) {
    const current = this.tasksSubject.getValue();
    task.id = uuidv4(); // generate unique ID
    this.tasksSubject.next([...current, task]);
    this.save();
  }

  markComplete(id: string) {
    const updated = this.tasksSubject.getValue().map(task =>
      task.id === id ? { ...task, completed: true } : task
    );
    this.tasksSubject.next(updated);
    this.save();
  }

  deleteTask(id: string) {
    const updated = this.tasksSubject.getValue().filter(task => task.id !== id);
    this.tasksSubject.next(updated);
    this.save();
  }

  private save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasksSubject.getValue()));
  }

  /** Generate mock task list **/
  private generateMockTasks(): Task[] {
    return [
      {
        id: uuidv4(),
        field: 'Field A',
        taskType: 'Planting',
        assignedTo: 'John Doe',
        startDate: '2025-07-15',
        endDate: '2025-07-16',
        notes: 'Start planting early in the morning.',
        completed: false,
      },
      {
        id: uuidv4(),
        field: 'Field B',
        taskType: 'Irrigation',
        assignedTo: 'Jane Smith',
        startDate: '2025-07-17',
        endDate: '2025-07-17',
        notes: 'Use sprinkler system.',
        completed: true,
      },
      {
        id: uuidv4(),
        field: 'Field C',
        taskType: 'Harvesting',
        assignedTo: 'Mark Lee',
        startDate: '2025-07-18',
        endDate: '2025-07-19',
        notes: 'Bring crates for packing.',
        completed: false,
      }
    ];
  }
}
