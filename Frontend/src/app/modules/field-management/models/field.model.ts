export interface Field {
  id: number;
  name: string;
  size: number;
  location: string;
  soilType: string;
  cropType: string;
  status: 'Active' | 'Inactive' | 'Harvested' | 'Planted';
  coordinates?: {
    lat: number;
    lng: number;
  };
}
