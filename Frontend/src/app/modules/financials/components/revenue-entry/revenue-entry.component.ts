import { Component } from '@angular/core';
import { FinancialService } from '../../services/financial.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private financialService: FinancialService) {}

  updateTotal() {
    this.revenue.total = this.quantity * this.price;
  }

  submitRevenue() {
    this.financialService.addRevenue({ ...this.revenue });
    this.revenue = { type: '', date: '', field: '', total: 0, description: '' };
    this.quantity = 0;
    this.price = 0;
  }
}
