import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Field } from '../../models/field.model';
import { FieldService } from '../../services/field.service';
import { FieldFormComponent } from '../field-form/field-form.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-field-list',
  standalone: true,
  imports: [
     RouterModule,
    CommonModule,
    FieldFormComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './field-list.component.html',
})
export class FieldListComponent {
  fields: Field[] = [];
  selectedField: Field | null = null;

  displayedColumns: string[] = [
    'name',
    'size',
    'location',
    'soilType',
    'cropType',
    'status',
    'actions',
    'view',
  ];

  constructor(
    private fieldService: FieldService,
    private router: Router
  ) {
    this.fields = this.fieldService.getFields();
  }

  addField() {
    this.selectedField = {
      id: 0,
      name: '',
      size: 0,
      location: '',
      soilType: '',
      cropType: '',
      status: 'Active',
      coordinates: { lat: 7.8731, lng: 80.7718 },
    };
  }

  editField(field: Field) {
    this.selectedField = { ...field };
  }

  saveField(field: Field) {
    if (field.id === 0) {
      this.fieldService.addField(field);
    } else {
      this.fieldService.updateField(field);
    }
    this.selectedField = null;
    this.fields = this.fieldService.getFields();
  }

  cancelEdit() {
    this.selectedField = null;
  }

  deleteField(id: number) {
    this.fieldService.deleteField(id);
    this.fields = this.fieldService.getFields();
  }

  focusOnField(field: Field) {
    if (field.coordinates) {
      this.router.navigate(['/fields/map'], {
        queryParams: {
          lat: field.coordinates.lat,
          lng: field.coordinates.lng,
          name: field.name,
        },
      });
    }
  }
}
