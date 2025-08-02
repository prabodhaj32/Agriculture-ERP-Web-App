import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DailyTask } from '../Model/daily-task.model';

@Injectable({
  providedIn: 'root',
})
export class ActivityLogService {
  private tasks: DailyTask[] = [];

  // BehaviorSubject to emit tasks changes
  private tasksSubject = new BehaviorSubject<DailyTask[]>([]);

  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    const stored = localStorage.getItem('dailyTasks');
    if (stored) {
      this.tasks = JSON.parse(stored);
      this.tasksSubject.next(this.tasks);
    }
  }

  addTask(task: DailyTask): void {
    this.tasks.push(task);
    localStorage.setItem('dailyTasks', JSON.stringify(this.tasks));
    this.tasksSubject.next([...this.tasks]); // emit updated list
  }

  getTasks(): DailyTask[] {
    return [...this.tasks];
  }

  clearTasks(): void {
    this.tasks = [];
    localStorage.removeItem('dailyTasks');
    this.tasksSubject.next([]);
  }
}
