import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SmartMonitoringComponent } from './smart-monitoring.component';
import { SmartMonitoringRoutingModule } from './smart-monitoring-routing.module';

@NgModule({
  imports: [
    SmartMonitoringRoutingModule,
    SmartMonitoringComponent 
  ]
})
export class SmartMonitoringModule {}
