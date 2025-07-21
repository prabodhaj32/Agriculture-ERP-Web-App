import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { FieldManagementRoutingModule } from './field-management-routing.module';

import { FieldManagementComponent } from './field-management.component';
import { FieldFormComponent } from './components/field-form/field-form.component';
import { FieldListComponent } from './components/field-list/field-list.component';
import { FieldMapComponent } from './components/field-map/field-map.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  // ❗️ Do NOT put standalone components in declarations
  imports: [
    CommonModule,
    FormsModule,              // Required for ngModel
    ReactiveFormsModule,      // Required for formGroup
    RouterModule,
    FieldManagementRoutingModule,

    // Standalone Components (you must import them)
    FieldManagementComponent,
    FieldFormComponent,
    FieldListComponent,
    FieldMapComponent,

    // Angular Material modules
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class FieldManagementModule {}
