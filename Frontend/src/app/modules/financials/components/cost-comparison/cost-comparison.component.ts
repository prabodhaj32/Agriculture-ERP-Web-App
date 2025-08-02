import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialService, Expense } from '../../services/financial.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ExpenseEntryComponent } from '../expense-entry/expense-entry.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cost-comparison',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './cost-comparison.component.html',
  styleUrls: ['./cost-comparison.component.css']
})
export class CostComparisonComponent implements OnInit, OnDestroy {
  comparisonData: Record<string, number> = {}; // only declared once
  displayedColumns: string[] = ['field', 'expense'];
  private subscription!: Subscription;

  constructor(
    private financialService: FinancialService,
    private dialog: MatDialog
  ) {}

  get comparisonKeyValue() {
    return Object.entries(this.comparisonData).map(([key, value]) => ({ key, value }));
  }

  ngOnInit() {
    this.subscription = this.financialService.expenses$.subscribe((expenses: Expense[]) => {
      this.comparisonData = this.calculateFieldWiseComparison(expenses);
    });
  }

  calculateFieldWiseComparison(expenses: Expense[]): Record<string, number> {
    const result: Record<string, number> = {};
    expenses.forEach(expense => {
      result[expense.field] = (result[expense.field] || 0) + expense.amount;
    });
    return result;
  }

  exportComparisonToExcel() {
    const exportData = Object.entries(this.comparisonData).map(([field, total]) => ({
      Field: field,
      'Total Expense': total
    }));
    this.financialService.exportToExcel(exportData, 'field-wise-cost-comparison');
  }

  openExpenseEntryDialog() {
    this.dialog.open(ExpenseEntryComponent, {
      width: '500px'
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
