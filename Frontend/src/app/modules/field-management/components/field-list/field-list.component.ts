import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { FieldService } from '../../services/field.service';
import { Field } from '../../models/field.model';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FieldFormComponent } from '../field-form/field-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { MapComponent } from '../../map/map.component';

@Component({
  selector: 'app-field-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FieldFormComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MapComponent,
  ],
  templateUrl: './field-list.component.html',
})
export class FieldListComponent implements OnInit, AfterViewChecked {
  @Input() fields: Field[] = [];

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
  focusedField?: Field;

  private mapInitialized = false;

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

  viewMap(field: Field) {
    this.focusedField = field;
  }

  closeMapPopup() {
    this.focusedField = undefined;
  }

  ngAfterViewChecked() {
    if (this.focusedField && !this.mapInitialized) {
      setTimeout(() => {
        // You may want to replace '#map' with the actual ID or class of your map container inside app-map
        const mapElement = document.querySelector('#map');
        if (mapElement) {
          // Assuming your MapComponent exposes the leaflet map instance globally as window.leafletMap
          (window as any).leafletMap?.invalidateSize?.();
          this.mapInitialized = true;
        }
      }, 300);
    }
    if (!this.focusedField) {
      this.mapInitialized = false;
    }
  }
}
