import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FieldFormComponent } from './components/field-form/field-form.component';
import { FieldListComponent } from './components/field-list/field-list.component';
import { MapComponent } from './map/map.component';
// import { FieldMapComponent } from './components/field-map/field-map.component';

@Component({
  selector: 'app-field-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FieldFormComponent,
    FieldListComponent,
    // FieldMapComponent,
    MapComponent
  ],
  templateUrl: './field-management.component.html',
  styleUrls: ['./field-management.component.css']
})
export class FieldManagementComponent {
  
  
}
