import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { FieldService } from '../../services/field.service';
import { Field } from '../../models/field.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-field-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './field-map.component.html',
})
export class FieldMapComponent implements AfterViewInit {
  @ViewChild('map') mapElementRef!: ElementRef;
  fields: Field[] = [];

  constructor(private fieldService: FieldService) {}

  ngAfterViewInit(): void {
    this.fields = this.fieldService.getFields();

    const map = L.map(this.mapElementRef.nativeElement).setView([7.8731, 80.7718], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    this.fields.forEach((field) => {
      if (field.coordinates) {
        L.marker([field.coordinates.lat, field.coordinates.lng])
          .addTo(map)
          .bindPopup(`
            <b>${field.name}</b><br>Status: ${field.status}<br>Crop: ${field.cropType}
          `);
      }
    });
  }
}
