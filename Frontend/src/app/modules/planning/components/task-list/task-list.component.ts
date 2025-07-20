import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    TaskFormComponent // required if it's standalone
  ],
  providers: [DatePipe],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: Task[] = [];

  displayedColumns: string[] = ['taskType', 'assignedTo', 'startDate', 'endDate', 'status', 'actions'];

  constructor(private taskService: TaskService, private dialog: MatDialog) {
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

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.addTask(result);
      }
    });
  }
}
