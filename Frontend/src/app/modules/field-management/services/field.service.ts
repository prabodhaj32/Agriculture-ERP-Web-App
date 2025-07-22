import { Injectable } from '@angular/core';
import { Field } from '../models/field.model';

@Injectable({ providedIn: 'root' })
export class FieldService {
  private fields: Field[] = [
   {
  id: 1,
  name: 'Field 1',
  size: 10,
  location: 'Nuwara Eliya',
  soilType: 'Loamy',
  cropType: 'Tea',
  status: 'Planted',
  lat: 6.9705,
  lng: 80.7820,
}
  ];

  getFields(): Field[] {
    return this.fields;
  }

  getFieldById(id: number): Field | undefined {
    return this.fields.find(f => f.id === id);
  }

  addField(field: Field) {
    field.id = this.fields.length ? Math.max(...this.fields.map(f => f.id)) + 1 : 1;
    this.fields.push(field);
  }

  updateField(field: Field) {
    const index = this.fields.findIndex(f => f.id === field.id);
    if (index > -1) {
      this.fields[index] = field;
    }
  }

  deleteField(id: number) {
    this.fields = this.fields.filter(f => f.id !== id);
  }
}
