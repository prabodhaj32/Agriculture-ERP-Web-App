import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DailyTaskFormComponent } from './components/daily-task-form/daily-task-form.component';
import { AttendanceFormComponent } from './components/attendance-form/attendance-form.component';
import { TaskSummaryComponent } from './components/task-summary/task-summary.component';

const routes: Routes = [
  { path: 'daily-task', component: DailyTaskFormComponent },
  { path: 'attendance', component: AttendanceFormComponent },
  { path: 'summary', component: TaskSummaryComponent },

  // Optional default route
  { path: '', redirectTo: 'daily-task', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityLogRoutingModule {}
