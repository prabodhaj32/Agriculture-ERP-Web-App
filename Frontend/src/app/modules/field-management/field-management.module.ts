import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { FieldManagementRoutingModule } from './field-management-routing.module';

import { FieldManagementComponent } from './field-management.component';
import { FieldFormComponent } from './components/field-form/field-form.component';
import { FieldListComponent } from './components/field-list/field-list.component';
// import { FieldMapComponent } from './components/field-map/field-map.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MapComponent } from './map/map.component';

@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,              
    ReactiveFormsModule,     
    RouterModule,
    FieldManagementRoutingModule,

   
    FieldManagementComponent,
    FieldFormComponent,
    FieldListComponent,
    // FieldMapComponent,

   
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MapComponent
  ]
})
export class FieldManagementModule {}
