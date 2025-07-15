import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpenseEntryComponent } from './components/expense-entry/expense-entry.component';
import { RevenueEntryComponent } from './components/revenue-entry/revenue-entry.component';
import { CostComparisonComponent } from './components/cost-comparison/cost-comparison.component';
import { IncomeExpenseChartComponent } from './components/income-expense-chart/income-expense-chart.component';

const routes: Routes = [
  { path: 'expenses', component: ExpenseEntryComponent },
  { path: 'revenues', component: RevenueEntryComponent },
  { path: 'cost-comparison', component: CostComparisonComponent },
  { path: 'income-expense-chart', component: IncomeExpenseChartComponent },
  { path: '', redirectTo: 'expenses', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialsRoutingModule {}
