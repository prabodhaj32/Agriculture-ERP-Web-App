import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlanningRoutingModule } from './planning-routing.module';


// import { TaskFormComponent } from './components/task-form/task-form.component';
// import { TaskListComponent } from './components/task-list/task-list.component';
// import { TaskCalendarComponent } from './components/task-calendar/task-calendar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms'; 

@NgModule({
  imports: [
   CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PlanningRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class PlanningModule {}
