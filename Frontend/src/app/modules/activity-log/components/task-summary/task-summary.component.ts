import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityLogService } from '../../services/activity-log.service';
import { FormsModule } from '@angular/forms';
import { DailyTask } from '../../Model/daily-task.model';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-task-summary',
  standalone: true,
  imports: [CommonModule, FormsModule,MatButtonModule],
  templateUrl: './task-summary.component.html',
  styleUrl: './task-summary.component.css',
})
export class TaskSummaryComponent implements OnInit {
  summary: DailyTask[] = [];
  filteredTasks: DailyTask[] = [];
  filterDate: string = '';

  constructor(private activityService: ActivityLogService) {}

  ngOnInit(): void {
    this.summary = this.activityService.getTasks();
    this.filteredTasks = [...this.summary];
  }

  filterTasks() {
    if (this.filterDate) {
      this.filteredTasks = this.summary.filter(t => t.date === this.filterDate);
    } else {
      this.filteredTasks = [...this.summary];
    }
  }

  exportReport() {
    const csvContent =
      'Date,Field,Task Type,Worker Name,Duration,Remarks\n' +
      this.filteredTasks
        .map(t =>
          [t.date, t.field, t.taskType, t.workerName, t.duration + 'h', t.remarks || ''].join(',')
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'daily-task-summary.csv';
    link.click();
  }

  clearAll() {
    if (confirm('Clear all tasks?')) {
      this.activityService.clearTasks();
      this.summary = [];
      this.filteredTasks = [];
    }
  }
}
