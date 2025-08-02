import { Component, Optional } from '@angular/core';
import { FinancialService } from '../../services/financial.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-revenue-entry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './revenue-entry.component.html',
  styleUrls: ['./revenue-entry.component.css']
})
export class RevenueEntryComponent {
  revenue = {
    type: '',
    date: '',
    field: '',
    total: 0,
    description: ''
  };

  quantity = 0;
  price = 0;

  constructor(
    private financialService: FinancialService,
    @Optional() private dialogRef?: MatDialogRef<RevenueEntryComponent>
  ) {}

  updateTotal() {
    this.revenue.total = this.quantity * this.price;
  }

  submitRevenue() {
    this.financialService.addRevenue({ ...this.revenue });
    alert('Revenue added successfully!');
    this.resetForm();
    this.dialogRef?.close(); // Close popup dialog if opened via MatDialog
  }

  cancel() {
    this.resetForm();
    this.dialogRef?.close(); // Close dialog on cancel as well
  }

  private resetForm() {
    this.revenue = { type: '', date: '', field: '', total: 0, description: '' };
    this.quantity = 0;
    this.price = 0;
  }
}
