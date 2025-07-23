// map.component.ts
import { Component, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  template: `<div id="map" style="height: 400px; width: 100%;"></div>`,
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  private marker!: L.Marker;

  @Input() lat?: number;
  @Input() lng?: number;
  @Input() readOnly = false;  
  @Output() locationSelected = new EventEmitter<{ lat: number; lng: number }>();

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const defaultLat = this.lat ?? 6.9271;
    const defaultLng = this.lng ?? 79.8612;

    this.map = L.map('map').setView([defaultLat, defaultLng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // Show marker if lat/lng provided
    if (this.lat && this.lng) {
      this.marker = L.marker([this.lat, this.lng]).addTo(this.map);
    }

    // Allow user to select new location if not readOnly
    if (!this.readOnly) {
      this.map.on('click', (e: L.LeafletMouseEvent) => {
        const latLng = e.latlng;

        if (this.marker) {
          this.map.removeLayer(this.marker);
        }

        this.marker = L.marker(latLng).addTo(this.map);

        this.locationSelected.emit({ lat: latLng.lat, lng: latLng.lng });
      });
    }
  }
}
