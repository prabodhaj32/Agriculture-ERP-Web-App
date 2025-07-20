// financials.component.ts
import { Component } from '@angular/core';
import { CostComparisonComponent } from './components/cost-comparison/cost-comparison.component';
import { ExpenseEntryComponent } from './components/expense-entry/expense-entry.component';
import { IncomeExpenseChartComponent } from './components/income-expense-chart/income-expense-chart.component';
import { RevenueEntryComponent } from './components/revenue-entry/revenue-entry.component';
@Component({
  selector: 'app-financials',
  standalone: true,
  imports: [
    
    CostComparisonComponent,
    ExpenseEntryComponent,
    IncomeExpenseChartComponent,
    RevenueEntryComponent,
  ],
  templateUrl: './financials.component.html',
  styleUrls: ['./financials.component.css']
})
export class FinancialsComponent {}
