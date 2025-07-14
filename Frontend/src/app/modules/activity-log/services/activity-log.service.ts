import { Injectable } from '@angular/core';
import { DailyTask } from '../Model/daily-task.model';

@Injectable({
  providedIn: 'root',
})
export class ActivityLogService {
  private tasks: DailyTask[] = [];

  constructor() {
    const stored = localStorage.getItem('dailyTasks');
    if (stored) {
      this.tasks = JSON.parse(stored);
    }
  }

  addTask(task: DailyTask): void {
    this.tasks.push(task);
    localStorage.setItem('dailyTasks', JSON.stringify(this.tasks));
  }

  getTasks(): DailyTask[] {
    return [...this.tasks]; // return a copy
  }

  clearTasks(): void {
    this.tasks = [];
    localStorage.removeItem('dailyTasks');
  }
}
