import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { DashboardStats, UpcomingTask } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  getStats() {
    return of<DashboardStats>({
      totalFields: 12,
      activeWorkers: 8,
      todaysHarvestKg: 350,
      fertilizerUsedKg: 45
    });
  }

  getTasks() {
    return of<UpcomingTask[]>([
      {
        title: 'Harvest in Plot A',
        type: 'harvest',
        dueDate: new Date(),
        assignedField: 'Field A',
        assignedWorker: 'Kamal'
      },
      {
        title: 'Fertilizer Application',
        type: 'fertilizing',
        dueDate: new Date(Date.now() + 3600 * 1000 * 6),
        assignedField: 'Field B',
        assignedWorker: 'Saman'
      }
    ]);
  }
}