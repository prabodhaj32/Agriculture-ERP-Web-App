import { Component } from '@angular/core';
import { FinancialService } from '../../services/financial.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense-entry',
   standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-entry.component.html',
  styleUrls: ['./expense-entry.component.css']
})
export class ExpenseEntryComponent {
  expense = { type: '', date: '', field: '', amount: 0, description: '' };

  constructor(private financialService: FinancialService) {}

  submitExpense() {
    this.financialService.addExpense(this.expense);
    this.expense = { type: '', date: '', field: '', amount: 0, description: '' };
  }
}