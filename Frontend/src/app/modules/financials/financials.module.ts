import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FinancialsRoutingModule } from './financials-routing.module';

import { ExpenseEntryComponent } from './components/expense-entry/expense-entry.component';
import { RevenueEntryComponent } from './components/revenue-entry/revenue-entry.component';
import { CostComparisonComponent } from './components/cost-comparison/cost-comparison.component';
import { IncomeExpenseChartComponent } from './components/income-expense-chart/income-expense-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FinancialsRoutingModule,
    ExpenseEntryComponent,
    RevenueEntryComponent,
    CostComparisonComponent,
    IncomeExpenseChartComponent
  ]
})
export class FinancialsModule {}

