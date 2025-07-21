export interface Field {
  id: number;
  name: string;
  size: number; // e.g., in acres or hectares
  location: string;
  soilType: string;
  cropType: string;
  status: 'Planted' | 'Harvested' | 'Idle' | 'Maintenance';
  lat?: number;  // for map location (optional)
  lng?: number;
}
