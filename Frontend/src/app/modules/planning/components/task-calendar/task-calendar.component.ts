
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-task-calendar',
  standalone: true,
   imports: [CommonModule, MatCardModule, MatButtonModule, MatChipsModule,MatIconModule,MatDividerModule], 
   schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  templateUrl: './task-calendar.component.html',
  styleUrls: ['./task-calendar.component.css']
})
export class TaskCalendarComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
    this.taskService.tasks$.subscribe(data => {
      this.tasks = data;
    });
  }

  markComplete(task: Task) {
    // Call your service method to mark the task as completed
    this.taskService.markComplete(task.id);
  }

  deleteTask(task: Task) {
    // Call your service method to delete the task
    this.taskService.deleteTask(task.id);
  }
}
