import { Component } from '@angular/core';
import { AttendanceFormComponent } from './components/attendance-form/attendance-form.component';
import { DailyTaskFormComponent } from './components/daily-task-form/daily-task-form.component';
import { TaskSummaryComponent } from './components/task-summary/task-summary.component';


@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [
    AttendanceFormComponent,
    DailyTaskFormComponent,
    TaskSummaryComponent
  ],
  templateUrl: './activity-log.component.html',
  styleUrl: './activity-log.component.css'
})
export class ActivityLogComponent {}
