import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Field } from '../../models/field.model';
import { FieldService } from '../../services/field.service';
import { FieldFormComponent } from '../field-form/field-form.component';

// Import Angular Material modules
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-field-list',
  standalone: true,
  imports: [
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
  ];

  constructor(private fieldService: FieldService) {
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
}
