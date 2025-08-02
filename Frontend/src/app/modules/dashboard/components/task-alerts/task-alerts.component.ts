import { Component, Input } from '@angular/core';
import { UpcomingTask } from '../../models/dashboard.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-task-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-alerts.component.html',
  styleUrl: './task-alerts.component.css'
})
export class TaskAlertsComponent {
      @Input() tasks: UpcomingTask[] = [];
}
