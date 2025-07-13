// src/app/modules/planning/services/task.service.ts
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
}
