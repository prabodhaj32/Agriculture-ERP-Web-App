import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { StatsCardsComponent } from './components/stats-cards/stats-cards.component';
import { WeatherWidgetComponent } from './components/weather-widget/weather-widget.component';
import { TaskAlertsComponent } from './components/task-alerts/task-alerts.component';

@NgModule({
  declarations: [], 
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardPageComponent,
    StatsCardsComponent,
    WeatherWidgetComponent,
    TaskAlertsComponent,
     HttpClientModule
  ]
})
export class DashboardModule {}
