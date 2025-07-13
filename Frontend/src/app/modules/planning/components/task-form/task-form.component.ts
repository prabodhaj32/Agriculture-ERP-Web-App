import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  constructor(private taskService: TaskService) {}

  save(
    field: string,
    taskType: string,
    assignedTo: string,
    startDate: string,
    endDate: string,
    notes: string
  ) {
    const newTask: Task = {
      id: this.generateId(),
      field,
      taskType,
      assignedTo,
      startDate,
      endDate,
      notes,
      completed: false,
    };

    this.taskService.addTask(newTask);
    alert('Task saved!');
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
