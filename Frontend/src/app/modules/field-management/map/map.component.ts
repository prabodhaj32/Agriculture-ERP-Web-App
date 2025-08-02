import {
  Component,
  AfterViewInit,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

import * as L from 'leaflet'
import 'leaflet-draw';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
 iconRetinaUrl: 'assets/leaflet/images/marker-icon-2x.png',
  iconUrl: 'assets/leaflet/images/marker-icon.png',
  shadowUrl: 'assets/leaflet/images/marker-shadow.png',
});

@Component({
  selector: 'app-map',
  standalone: true,
  encapsulation: ViewEncapsulation.None, 
  template: `<div #mapContainer id="map" class="leaflet-map-container"></div>`,
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  @Input() lat = 7.8731;
  @Input() lng = 80.7718;
  @Input() readOnly = false;
  @Input() areaGeoJson?: GeoJSON.GeoJsonObject;

  @Output() areaDrawn = new EventEmitter<GeoJSON.GeoJsonObject>();
  @Output() locationSelected = new EventEmitter<{ lat: number; lng: number }>();

  private map!: L.Map;
  private geoJsonLayer?: L.GeoJSON;
  private drawnItems = new L.FeatureGroup();
  private mapClickHandler?: (e: L.LeafletMouseEvent) => void;

  ngAfterViewInit(): void {
    this.initializeMap();

    if (this.readOnly) {
      this.renderReadOnlyView();
    } else {
      this.enableDrawing();
      this.mapClickHandler = this.onMapClick.bind(this);
      this.map.on('click', this.mapClickHandler);
    }
  }

  private initializeMap(): void {
    const normalLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    });

    const satelliteLayer = L.layerGroup([
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles © Esri — Source: Esri, Earthstar Geographics',
          maxZoom: 19,
        }
      ),
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Labels © Esri',
          maxZoom: 19,
        }
      ),
    ]);

    this.map = L.map(this.mapContainer.nativeElement, {
      center: [this.lat, this.lng],
      zoom: 7,
      layers: [normalLayer],
    });

    const baseLayers = {
      '🗺️ Normal View': normalLayer,
      '🛰️ Satellite + Labels': satelliteLayer,
    };

    L.control.layers(baseLayers).addTo(this.map);
    this.map.invalidateSize();
  }

  private renderReadOnlyView(): void {
    this.clearGeoJsonLayer();

    if (this.areaGeoJson) {
      this.geoJsonLayer = L.geoJSON(this.areaGeoJson).addTo(this.map);
      this.map.fitBounds(this.geoJsonLayer.getBounds());
    }
  }

  private clearGeoJsonLayer(): void {
    if (this.geoJsonLayer) {
      this.map.removeLayer(this.geoJsonLayer);
      this.geoJsonLayer = undefined;
    }
  }

  private enableDrawing(): void {
    if (!this.map) {
      console.error('Map not initialized');
      return;
    }

    if (!this.map.hasLayer(this.drawnItems)) {
      this.map.addLayer(this.drawnItems);
    }

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: {
          allowIntersection: true,
          showArea: false,
          shapeOptions: { color: '#3383ff' },
        },
        rectangle: false,
        polyline: false,
        marker: false,
        circle: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: this.drawnItems,
        remove: true,
      },
    });

    this.map.addControl(drawControl);

    
    if ((L as any).Draw && (L as any).Draw.Event) {
      this.map.on((L as any).Draw.Event.CREATED, (event: any) => {
        const layer = event.layer;
        if (layer) {
          this.drawnItems.clearLayers();
          this.drawnItems.addLayer(layer);
          const geoJson = layer.toGeoJSON();
          this.areaDrawn.emit(geoJson);
        }
      });
    } else {
      console.error('L.Draw or L.Draw.Event is undefined. Ensure leaflet-draw is imported.');
    }
  }

  private onMapClick(e: L.LeafletMouseEvent): void {
    const { lat, lng } = e.latlng;
    this.locationSelected.emit({ lat, lng });
  }

  ngOnDestroy(): void {
    if (this.map) {
      if (this.mapClickHandler) {
        this.map.off('click', this.mapClickHandler);
      }
      this.map.off();
      this.map.remove();
    }
    this.drawnItems.clearLayers();
  }
}