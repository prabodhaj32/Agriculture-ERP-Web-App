import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardsComponent } from '../../components/stats-cards/stats-cards.component';
import { WeatherWidgetComponent } from '../../components/weather-widget/weather-widget.component';
import { TaskAlertsComponent } from '../../components/task-alerts/task-alerts.component';
import { DashboardService } from '../../services/dashboard.service';
import { WeatherService } from '../../services/weather.service';
import { DashboardStats, UpcomingTask } from '../../models/dashboard.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, StatsCardsComponent, WeatherWidgetComponent, TaskAlertsComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  stats: DashboardStats | null = null;
  weather: any;
  tasks: UpcomingTask[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private dashboardService: DashboardService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    //  Load weather
    this.weatherService.getWeather()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => this.weather = data,
        error: err => {
          console.error('Weather data load failed:', err);
          this.weather = { error: 'Unable to fetch weather data. Check API key or try again later.' };
        }
      });

    // Load stats
    this.dashboardService.getStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => this.stats = data,
        error: err => {
          console.error('Stats load failed:', err);
          this.stats = null;
        }
      });

    // Load tasks
    this.dashboardService.getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.tasks = data);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
