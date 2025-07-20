import { Injectable } from '@angular/core';
import { Field } from '../models/field.model';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  private fields: Field[] = [
    {
      id: 1,
      name: 'North Field',
      size: '5',
      location: 'Kandy',
      soilType: 'Loamy',
      cropType: 'Corn',
      status: 'Active'
    },
    {
      id: 2,
      name: 'South Field',
      size: '3',
      location: 'colombo',
      soilType: 'Clay',
      cropType: 'Wheat',
      status: 'Inactive'
    }
  ];

  // Return a shallow copy of the fields array
  getFields(): Field[] {
    return [...this.fields];
  }

  // Add a new field with a unique ID
  addField(field: Field): void {
    const newId = this.fields.length > 0 ? Math.max(...this.fields.map(f => f.id)) + 1 : 1;
    const newField: Field = { ...field, id: newId };
    this.fields.push(newField);
  }

  // Update an existing field
  updateField(updatedField: Field): void {
    const index = this.fields.findIndex(f => f.id === updatedField.id);
    if (index !== -1) {
      this.fields[index] = { ...updatedField };
    }
  }

  // Delete a field by ID
  deleteField(id: number): void {
    this.fields = this.fields.filter(f => f.id !== id);
  }

  // Optional: Get a field by ID
  getFieldById(id: number): Field | undefined {
    return this.fields.find(f => f.id === id);
  }
}
