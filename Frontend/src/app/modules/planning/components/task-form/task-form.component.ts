import { Component, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  field = '';
  taskType = '';
  assignedTo = '';
  startDate = '';
  endDate = '';
  notes = '';

  constructor(@Optional() private dialogRef?: MatDialogRef<TaskFormComponent>) {}

  save() {
    const newTask: Task = {
      id: this.generateId(),
      field: this.field,
      taskType: this.taskType,
      assignedTo: this.assignedTo,
      startDate: this.startDate,
      endDate: this.endDate,
      notes: this.notes,
      completed: false,
    };

    if (this.dialogRef) {
      this.dialogRef.close(newTask); // used in popup
    } else {
      alert('Task saved (direct form)');
      // Handle direct-save logic here (optional)
    }
  }

  cancel() {
    this.dialogRef?.close(); // close dialog only if available
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
