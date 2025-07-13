import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  providers: [DatePipe],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: Task[] = [];
  
  // Add this:
  displayedColumns: string[] = ['taskType', 'assignedTo', 'startDate', 'endDate', 'status', 'actions'];

  constructor(private taskService: TaskService) {
    this.taskService.tasks$.subscribe(data => {
      this.tasks = data;
    });
  }

  markComplete(task: Task) {
    this.taskService.markComplete(task.id);
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
  }
}
