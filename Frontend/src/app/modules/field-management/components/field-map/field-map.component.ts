import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';//Showing map tiles (like OpenStreetMap)
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-field-map',
  standalone: true,
  imports: [CommonModule,MatButtonModule,
  MatIconModule],
  templateUrl: './field-map.component.html',
})
export class FieldMapComponent implements AfterViewInit {
  @ViewChild('map') mapElement!: ElementRef;

  private map!: L.Map;
  lat = 7.8731; // Default latitude (Sri Lanka)
  lng = 80.7718;
  name = 'Field';

  constructor(private location: Location, private route: ActivatedRoute) {
  this.route.queryParams.subscribe(params => {
    this.lat = +params['lat'] || this.lat;
    this.lng = +params['lng'] || this.lng;
    this.name = params['name'] || this.name;
  });
}

  ngAfterViewInit(): void {
    this.map = L.map(this.mapElement.nativeElement, {
      center: [this.lat, this.lng],
      zoom: 14,
      scrollWheelZoom: true,
      zoomControl: true,
      inertia: true,
      zoomAnimation: true,
      fadeAnimation: true,
    });

    //OpenStreetMap Google Maps but open-source

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      detectRetina: true,
      keepBuffer: 5,
      updateWhenZooming: false,
      updateWhenIdle: true,
    }).addTo(this.map);

    L.marker([this.lat, this.lng])
      .addTo(this.map)
      .bindPopup(`<b>${this.name}</b>`)
      .openPopup();

   
    this.map.flyTo([this.lat, this.lng], 14, {
      animate: true,
      duration: 1.5,
    });

    
  }
  goBack() {
  this.location.back();
}
  
}
