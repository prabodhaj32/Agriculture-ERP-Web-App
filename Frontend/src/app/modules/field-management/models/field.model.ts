export interface Field {
  id: number;
  name: string;
  size: number; 
  location: string;
  soilType: string;
  cropType: string;
  status: 'Planted' | 'Harvested' | 'Idle' | 'Maintenance';
  lat?: number;  
  lng?: number;

   areaGeoJson?: any;
}
