import { Component } from '@angular/core';
import { Field } from './models/field.model';
import { FieldService } from './services/field.service';
import { FieldFormComponent } from './components/field-form/field-form.component';
import { FieldListComponent } from './components/field-list/field-list.component';
import { FieldMapComponent } from './components/field-map/field-map.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-field-management',
  standalone: true,
  imports: [CommonModule, FieldFormComponent, FieldListComponent, FieldMapComponent],
  templateUrl: './field-management.component.html',
})
export class FieldManagementComponent {
  selectedField: Field | null = null;
  isAddMode = false;
  selectedFieldForMap: Field | null = null;

  constructor(public fieldService: FieldService) {}

  get fields() {
    return this.fieldService.getFields();
  }

  onAdd() {
    this.selectedField = {
      id: 0,
      name: '',
      size: '',
      location: '',
      soilType: '',
      cropType: '',
      status: '',
    };
    this.isAddMode = true;
  }

  onSave(field: Field) {
    if (field.id === 0) {
      this.fieldService.addField(field);
    } else {
      this.fieldService.updateField(field);
    }
    this.resetForm();
  }

  onCancel() {
    this.resetForm();
  }

  onEdit(field: Field) {
    this.selectedField = { ...field };
    this.isAddMode = true;
  }

  onViewMap(field: Field) {
    this.selectedFieldForMap = field;
  }

  private resetForm() {
    this.selectedField = null;
    this.isAddMode = false;
  }
}
