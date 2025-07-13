import { Component } from '@angular/core';
import { Task } from './models/task.model';
import { TaskService } from './services/task.service';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskCalendarComponent } from './components/task-calendar/task-calendar.component';

@Component({
  selector: 'app-planning',
  imports: [TaskFormComponent, TaskListComponent, TaskCalendarComponent],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.css'
})
export class PlanningComponent {
  constructor(private taskService: TaskService) {}

  saveTask(task: Task) {
    this.taskService.addTask(task);
  }
}
