import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 

import { DashboardService } from './services/dashboard.service';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule], 
  templateUrl: './dashboard.component.html',
  // styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: any;
  weather: any;
  tasks: any[] = [];

  constructor(
    private dashboardService: DashboardService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe(data => this.stats = data);
    this.weatherService.getWeather().subscribe(data => this.weather = data);
    this.dashboardService.getTasks().subscribe(data => this.tasks = data);
  }
}
