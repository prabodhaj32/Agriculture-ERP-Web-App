// import {
//   Component,
//   AfterViewInit,
//   ElementRef,
//   ViewChild,
//   Input,
// } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import * as L from 'leaflet';
// import { Location } from '@angular/common';
// import { Field } from '../../models/field.model';

// @Component({
//   selector: 'app-field-map',
//   standalone: true,
//   imports: [],
//   templateUrl: './field-map.component.html',
//   styleUrls: ['./field-map.component.css'],
// })
// export class FieldMapComponent implements AfterViewInit {
//   @Input() field!: Field;
//   @ViewChild('map', { static: false }) mapElement!: ElementRef;

//   private map!: L.Map;
//   lat = 7.8731; // Default Sri Lanka lat
//   lng = 80.7718; // Default Sri Lanka lng
//   name = 'Field';

//   constructor(private location: Location, private route: ActivatedRoute) {
//     this.route.queryParams.subscribe((params) => {
//       this.lat = +params['lat'] || this.lat;
//       this.lng = +params['lng'] || this.lng;
//       this.name = params['name'] || this.name;
//     });
//   }

//   ngAfterViewInit(): void {
//     setTimeout(() => this.initializeMap(), 0); // allow DOM to stabilize
//   }

//   private initializeMap(): void {
//     const mapContainer = this.mapElement.nativeElement;

//     // Initialize map
//     this.map = L.map(mapContainer, {
//       center: [this.lat, this.lng],
//       zoom: 13,
//       zoomControl: true,
//       scrollWheelZoom: true,
//     });

//     // Add OpenStreetMap tiles
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '© OpenStreetMap contributors',
//     }).addTo(this.map);

//     // Add marker
//     L.marker([this.lat, this.lng])
//       .addTo(this.map)
//       .bindPopup(`<strong>${this.name}</strong>`)
//       .openPopup();

//     // Smooth fly to
//     this.map.flyTo([this.lat, this.lng], 13, {
//       animate: true,
//       duration: 1.5,
//     });

//     // Ensure map fully renders with animation
//     setTimeout(() => {
//       this.map.invalidateSize();
//       mapContainer.classList.add('map-loaded');
//     }, 600);
//   }

//   goBack(): void {
//     this.location.back();
//   }
// }
