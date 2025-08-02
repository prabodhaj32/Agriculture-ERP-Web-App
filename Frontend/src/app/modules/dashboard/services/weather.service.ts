import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private API_KEY = '9a41ba142ca0894c5d5c1e3ac09ae822';
  private LAT = 7.2906;
  private LON = 80.6336;
  private URL = `https://api.openweathermap.org/data/2.5/weather?lat=${this.LAT}&lon=${this.LON}&appid=${this.API_KEY}&units=metric`;

  constructor(private http: HttpClient) {}

  getWeather(): Observable<any> {
    return this.http.get(this.URL).pipe(
      catchError(error => {
        console.error('Weather API Error:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          url: error.url,
          errorDetails: error.error 
        });
        return throwError(() => new Error('Failed to fetch weather data'));
      })
    );
  }
}