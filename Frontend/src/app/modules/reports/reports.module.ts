import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReportsComponent } from './reports.component';
import { FiltersComponent } from './components/filters/filters.component';
import { HarvestSummaryComponent } from './components/harvest-summary/harvest-summary.component';
import { ProductivityCostComponent } from './components/productivity-cost/productivity-cost.component';

import { ReportsRoutingModule } from '../reports/report-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReportsRoutingModule,


    ReportsComponent,
    FiltersComponent,
    HarvestSummaryComponent,
    ProductivityCostComponent,
  ]
})
export class ReportsModule {}
