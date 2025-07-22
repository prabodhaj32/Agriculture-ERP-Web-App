import { Component, OnInit } from '@angular/core';
import { FieldService } from '../../services/field.service';
import { Field } from '../../models/field.model';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FieldFormComponent } from '../field-form/field-form.component';
import { FieldMapComponent } from '../field-map/field-map.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-field-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FieldFormComponent,
    FieldMapComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
  ],
  templateUrl: './field-list.component.html',
})
export class FieldListComponent implements OnInit {
  fields: Field[] = [];
  dataSource = new MatTableDataSource<Field>([]);
  displayedColumns: string[] = [
    'name',
    'size',
    'location',
    'soilType',
    'cropType',
    'status',
    'map',        
    'actions',
  ];

  showFieldForm = false;
  editingField?: Field;
  focusedField: Field | null = null; 

  constructor(private fieldService: FieldService) {}

  ngOnInit() {
    this.loadFields();
  }

  loadFields() {
    this.fields = this.fieldService.getFields();
    this.dataSource.data = this.fields;
  }

  onAddField() {
    this.editingField = undefined;
    this.showFieldForm = true;
  }

  onEditField(id: number) {
    const field = this.fields.find(f => f.id === id);
    if (field) {
      this.editingField = { ...field };
      this.showFieldForm = true;
    }
  }

  onFormSubmit(field: Field) {
    if (field.id) {
      this.fieldService.updateField(field);
    } else {
      this.fieldService.addField(field);
    }
    this.loadFields();
    this.showFieldForm = false;
  }

  onDeleteField(id: number) {
    if (confirm('Are you sure you want to delete this field?')) {
      this.fieldService.deleteField(id);
      this.loadFields();
    }
  }

  closeFieldForm() {
    this.showFieldForm = false;
    this.editingField = undefined;
  }

    onMapView(field: Field) {
    this.focusedField = field; 
  }

  closeMapPopup() {
    this.focusedField = null;
  }
}
