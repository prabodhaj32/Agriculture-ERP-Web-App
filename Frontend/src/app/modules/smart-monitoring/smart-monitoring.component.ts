import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { WeatherData, CropRecommendation } from './models/weather.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-smart-monitoring',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './smart-monitoring.component.html',
  styleUrls: ['./smart-monitoring.component.css']
})
export class SmartMonitoringComponent implements OnInit {
  weatherData: WeatherData = { rainfall: 0, temperature: 0, sunlightHours: 0, soilMoisture: 0 };
  alerts: string[] = [];
  cropRecommendations: CropRecommendation[] = [];
  latitude = 6.9271;
  longitude = 79.8612;
  loading = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchWeather();
  }

  fetchWeather(): void {
  this.loading = true;
  this.weatherService.fetchWeather(this.latitude, this.longitude).subscribe(data => {
    console.log('Raw weather data received:', data);
     this.weatherData = data;
    //this.weatherData = { ...data, rainfall: 12.34 };
    this.evaluateAlerts();
    this.generateCropRecommendations();
    this.loading = false;
  });
}

  evaluateAlerts(): void {
    this.alerts = [];
    if (this.weatherData.rainfall > 50) this.alerts.push('Excessive Rainfall detected!');
    else if (this.weatherData.rainfall < 5) this.alerts.push('Low Rainfall detected!');
    if (this.weatherData.soilMoisture < 30) this.alerts.push('Low Soil Moisture.');
  }

  generateCropRecommendations(): void {
    this.cropRecommendations = [];
    const { rainfall, temperature, sunlightHours, soilMoisture } = this.weatherData;

    if (rainfall > 40 && temperature >= 20 && temperature <= 30 && soilMoisture >= 40) {
      this.cropRecommendations.push({
        crop: 'Tea',
        reason: 'Ideal conditions for Tea cultivation.'
      });
    }
    if (temperature > 30 && sunlightHours > 7 && soilMoisture > 50) {
      this.cropRecommendations.push({
        crop: 'Chili',
        reason: 'Hot and sunny weather supports Chili growth.'
      });
    }
    if (soilMoisture < 20) {
      this.cropRecommendations.push({
        crop: 'Millet',
        reason: 'Low soil moisture suitable for drought-resistant crops.'
      });
    }
    if (this.cropRecommendations.length === 0) {
      this.cropRecommendations.push({
        crop: 'General crops',
        reason: 'Monitor conditions closely for suitable crops.'
      });
    }
  }
}