import { Injectable } from '@angular/core';
import { Field } from '../models/field.model';

@Injectable({ providedIn: 'root' })
export class FieldService {
  private fields: Field[] = [
    {
      id: 1,
      name: 'Field A',
      size: 10,
      location: 'kandy',
      soilType: 'Loamy',
      cropType: 'Tea',
      status: 'Planted',
      coordinates: { lat: 7.2906, lng: 80.6337 } // Kandy
    },
    {
      id: 2,
      name: 'Field B',
      size: 5,
      location: 'colombo',
      soilType: 'Clay',
      cropType: 'Coconut',
      status: 'Active',
      coordinates: { lat: 6.9271, lng: 79.8612 } // Colombo
    }
  ];

  getFields(): Field[] {
    return this.fields;
  }

  addField(field: Field) {
    field.id = Date.now();
    this.fields.push(field);
  }

  updateField(updated: Field) {
    const index = this.fields.findIndex(f => f.id === updated.id);
    if (index !== -1) this.fields[index] = updated;
  }

  deleteField(id: number) {
    this.fields = this.fields.filter(f => f.id !== id);
  }
}
