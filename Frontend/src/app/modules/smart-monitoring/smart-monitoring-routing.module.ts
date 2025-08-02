import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmartMonitoringComponent } from './smart-monitoring.component';

const routes: Routes = [
  {
    path: '',
    component: SmartMonitoringComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmartMonitoringRoutingModule {}
