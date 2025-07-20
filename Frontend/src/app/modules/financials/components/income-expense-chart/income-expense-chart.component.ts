import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialService, Expense, Revenue } from '../../services/financial.service';
import { Subscription, combineLatest } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RevenueEntryComponent } from '../revenue-entry/revenue-entry.component';
import { MatTableModule } from '@angular/material/table'; 

@Component({
  selector: 'app-income-expense-chart',
  standalone: true,
  imports: [CommonModule, MatDialogModule,  MatTableModule],
  templateUrl: './income-expense-chart.component.html',
  styleUrls: ['./income-expense-chart.component.css']
})
export class IncomeExpenseChartComponent implements OnInit, OnDestroy {
  chartData: { income: Record<string, number>, expense: Record<string, number> } = {
    income: {},
    expense: {}
  };

  tableData: { month: string; income: number; expense: number }[] = [];
  displayedColumns: string[] = ['month', 'income', 'expense'];

  private subscription!: Subscription;

  constructor(
    private financialService: FinancialService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscription = combineLatest([
      this.financialService.revenues$,
      this.financialService.expenses$
    ]).subscribe(([revenues, expenses]: [Revenue[], Expense[]]) => {
      // Update chart data
      this.chartData = this.financialService.getMonthlyChartData(revenues, expenses);

      // Rebuild table data
      const months = new Set([
        ...Object.keys(this.chartData.income),
        ...Object.keys(this.chartData.expense)
      ]);

      this.tableData = Array.from(months).map(month => ({
        month,
        income: this.chartData.income[month] || 0,
        expense: this.chartData.expense[month] || 0
      }));
    });
  }

  openRevenueEntryDialog() {
    const dialogRef = this.dialog.open(RevenueEntryComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
      // Optionally refresh or notify user
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
