import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FieldManagementRoutingModule } from './field-management-routing.module';


import { FieldManagementComponent } from './field-management.component';
import { FieldFormComponent } from './components/field-form/field-form.component';
import { FieldListComponent } from './components/field-list/field-list.component';


import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FieldMapComponent } from './components/field-map/field-map.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [], 
  imports: [
    CommonModule,
    FormsModule,
    FieldMapComponent,
     RouterModule,
    FieldManagementRoutingModule,


    MatTableModule,
    MatButtonModule,
    MatIconModule,


    FieldManagementComponent,
    FieldFormComponent,
    FieldListComponent,
  ],
})
export class FieldManagementModule {}
