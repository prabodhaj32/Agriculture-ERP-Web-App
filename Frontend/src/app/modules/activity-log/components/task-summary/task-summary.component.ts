import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityLogService } from '../../services/activity-log.service';
import { FormsModule } from '@angular/forms';
import { DailyTask } from '../../Model/daily-task.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DailyTaskFormComponent } from '../daily-task-form/daily-task-form.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-task-summary',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
  ],
  templateUrl: './task-summary.component.html',
  styleUrls: ['./task-summary.component.css'],
})
export class TaskSummaryComponent implements OnInit, OnDestroy {
  summary: DailyTask[] = [];
  filteredTasks: DailyTask[] = [];
  filterDate: string = '';

  displayedColumns: string[] = [
    'date',
    'field',
    'taskType',
    'workerName',
    'duration',
    'remarks',
    'photos'
  ];

  private subscription!: Subscription;
  private dialog = inject(MatDialog);

  constructor(private activityService: ActivityLogService) {}

  ngOnInit(): void {
    this.subscription = this.activityService.tasks$.subscribe((tasks) => {
      this.summary = tasks;
      this.filterTasks();
      console.log('Tasks updated:', tasks);
    });
  }

  openAddTaskForm(): void {
    const dialogRef = this.dialog.open(DailyTaskFormComponent, {
      width: '500px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.filterTasks();
      }
    });
  }

  filterTasks(): void {
    if (this.filterDate) {
      this.filteredTasks = this.summary.filter((t) => t.date === this.filterDate);
    } else {
      this.filteredTasks = [...this.summary];
    }
  }

  exportReport(): void {
    if (this.filteredTasks.length === 0) {
      alert('No tasks to export.');
      return;
    }

    const headers = ['Date', 'Field', 'Task Type', 'Worker Name', 'Duration', 'Remarks'];
    const csvRows = [
      headers.join(','),
      ...this.filteredTasks.map((t) =>
        [
          t.date,
          `"${t.field.replace(/"/g, '""')}"`,
          `"${t.taskType.replace(/"/g, '""')}"`,
          `"${t.workerName.replace(/"/g, '""')}"`,
          t.duration,
          `"${(t.remarks || '').replace(/"/g, '""')}"`
        ].join(',')
      ),
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `daily-task-summary-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  clearAll(): void {
    if (confirm('Are you sure you want to clear all tasks?')) {
      this.activityService.clearTasks();
      this.summary = [];
      this.filteredTasks = [];
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
