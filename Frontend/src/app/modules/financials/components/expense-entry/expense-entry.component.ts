import { Component, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FinancialService } from '../../services/financial.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-expense-entry',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './expense-entry.component.html',
  styleUrls: ['./expense-entry.component.css']
})
export class ExpenseEntryComponent {
  expense = {
    type: '',
    date: '',
    field: '',
    amount: 0,
    description: ''
  };

  constructor(
    private financialService: FinancialService,
    @Optional() private dialogRef?: MatDialogRef<ExpenseEntryComponent>
  ) {}

  // ✅ Submit and close dialog
  submitExpense() {
    this.financialService.addExpense(this.expense);
    alert('Expense added successfully!');
    this.resetForm();
    this.dialogRef?.close();
  }

  // ✅ Reset form fields
  resetForm() {
    this.expense = {
      type: '',
      date: '',
      field: '',
      amount: 0,
      description: ''
    };
  }

  // ✅ Cancel: reset and close dialog if applicable
  cancelExpenseForm() {
    this.resetForm();
    this.dialogRef?.close();
  }
}
