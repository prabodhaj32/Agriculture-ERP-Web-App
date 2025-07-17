import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { WeatherData } from '../models/weather.model';
import { environment } from '../environment'; 

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiKey = environment.openWeatherApiKey;
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  fetchWeather(lat: number, lon: number): Observable<WeatherData> {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;

    return this.http.get<any>(url).pipe(
      map(response => {
        const rainfall =
          response?.rain?.['1h'] ??
          response?.rain?.['3h'] ??
          0;

        const temperature = response?.main?.temp ?? 0;
        const sunlightHours = this.estimateSunlightHours(response);
        const soilMoisture = this.estimateSoilMoisture();

        return {
          rainfall,
          temperature,
          sunlightHours,
          soilMoisture,
        } as WeatherData;
      }),
      catchError(error => {
        console.error('Error fetching weather data:', error);
        return of({
          rainfall: 0,
          temperature: 0,
          sunlightHours: 0,
          soilMoisture: 0,
        });
      })
    );
  }

  private estimateSunlightHours(response: any): number {
    const sunrise = response?.sys?.sunrise;
    const sunset = response?.sys?.sunset;

    if (!sunrise || !sunset) return 0;

    const sunriseDate = new Date(sunrise * 1000);
    const sunsetDate = new Date(sunset * 1000);
    const diff = (sunsetDate.getTime() - sunriseDate.getTime()) / (1000 * 60 * 60);

    return Math.round(diff * 10) / 10;
  }

  private estimateSoilMoisture(): number {
    return Math.round(Math.random() * 1000) / 10; // 0.0 to 100.0%
  }
}
