import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Field } from '../../models/field.model';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
import { FormsModule, } from '@angular/forms';


@Component({
  selector: 'app-field-map',
   standalone: true,
  imports: [
    CommonModule,FormsModule],
  templateUrl: './field-map.component.html',
  styleUrls: ['./field-map.component.css'],
})
export class FieldMapComponent implements OnChanges, AfterViewInit {
  @Input() focusedField: Field | null = null;
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  private map!: L.Map;

  ngAfterViewInit(): void {
    if (this.focusedField) {
      this.initMap();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['focusedField'] && this.map) {
      this.updateMap();
    }
  }

  initMap(): void {
    const [lat, lng] = this.getCoordinates(this.focusedField!.location);
    this.map = L.map(this.mapContainer.nativeElement).setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.addMarker();
  }

  updateMap(): void {
    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker || layer instanceof L.TileLayer) {
        this.map.removeLayer(layer);
      }
    });

    this.initMap();
  }

  addMarker(): void {
    if (this.focusedField) {
      const [lat, lng] = this.getCoordinates(this.focusedField.location);
      L.marker([lat, lng])
        .addTo(this.map)
        .bindPopup(this.focusedField.name)
        .openPopup();
    }
  }

  getCoordinates(location: string): [number, number] {
    const [latStr, lngStr] = location.split(',');
    return [parseFloat(latStr.trim()), parseFloat(lngStr.trim())];
  }
}
