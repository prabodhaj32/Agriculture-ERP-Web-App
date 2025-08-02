import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HarvestRoutingModule } from './harvest-routing.module';
import { HarvestComponent } from './harvest.component';
import { HarvestFormComponent } from './components/harvest-form/harvest-form.component';
import { HarvestSummaryComponent } from './components/harvest-summary/harvest-summary.component';
import { PlannedVsActualComponent } from './components/planned-vs-actual/planned-vs-actual.component';

@NgModule({
  imports: [
    CommonModule,
    HarvestRoutingModule,

    
    HarvestComponent,
    HarvestFormComponent,
    HarvestSummaryComponent,
    PlannedVsActualComponent
  ]
})
export class HarvestModule {}
