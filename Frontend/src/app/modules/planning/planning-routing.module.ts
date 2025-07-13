import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskCalendarComponent } from './components/task-calendar/task-calendar.component';

const routes: Routes = [
   { path: '', redirectTo: 'form', pathMatch: 'full' },
  { path: 'form', component: TaskFormComponent },
  { path: 'list', component: TaskListComponent },
  { path: 'calendar', component: TaskCalendarComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanningRoutingModule {}
