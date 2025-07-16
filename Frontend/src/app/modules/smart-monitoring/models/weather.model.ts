export interface WeatherData {
  rainfall: number;         // in mm
  temperature: number;      // in °C
  sunlightHours: number;    // in hours
  soilMoisture: number;     // in % or volumetric content
}

export interface CropRecommendation {
  crop: string;
  reason: string;
}
