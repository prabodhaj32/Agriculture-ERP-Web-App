import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DailyTaskFormComponent } from './components/daily-task-form/daily-task-form.component';
import { AttendanceFormComponent } from './components/attendance-form/attendance-form.component';
import { TaskSummaryComponent } from './components/task-summary/task-summary.component';
import { ActivityLogRoutingModule } from './activity-log-routing.module';

@NgModule({
  
  declarations: [],

  
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ActivityLogRoutingModule,
    DailyTaskFormComponent,
    AttendanceFormComponent,
    TaskSummaryComponent
  ]
})
export class ActivityLogModule {}
