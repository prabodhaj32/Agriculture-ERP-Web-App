import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FieldManagementRoutingModule } from './field-management-routing.module';

// No need to declare standalone components
import { FieldManagementComponent } from './field-management.component';
import { FieldFormComponent } from './components/field-form/field-form.component';
import { FieldListComponent } from './components/field-list/field-list.component';

// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [], // ❌ Do not declare standalone components
  imports: [
    CommonModule,
    FormsModule,
    FieldManagementRoutingModule,

    // Material Modules
    MatTableModule,
    MatButtonModule,
    MatIconModule,

    // ✅ Standalone components must be imported manually
    FieldManagementComponent,
    FieldFormComponent,
    FieldListComponent,
  ],
})
export class FieldManagementModule {}
