import { Component } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgFor  } from '@angular/common';



@Component({
  selector: 'app-sales-tracker',
    standalone: true,
     imports: [CommonModule, FormsModule, NgFor,  ],
  templateUrl: './sales-tracker.component.html',
})
export class SalesTrackerComponent {
  constructor(private salesService: SalesService) {}
  sales = this.salesService.getSales();

  getTotalSales() {
    return this.sales.reduce((sum, s) => sum + s.total, 0);
  }

  getTotalPaid() {
    return this.sales.reduce((sum, s) => sum + s.amountPaid, 0);
  }

  getTotalDue() {
    return this.sales.reduce((sum, s) => sum + s.dueAmount, 0);
  }

  getBuyerSummary() {
    const summary: { [buyer: string]: { total: number; paid: number; due: number } } = {};

    for (let sale of this.sales) {
      if (!summary[sale.buyer]) {
        summary[sale.buyer] = { total: 0, paid: 0, due: 0 };
      }
      summary[sale.buyer].total += sale.total;
      summary[sale.buyer].paid += sale.amountPaid;
      summary[sale.buyer].due += sale.dueAmount;
    }

    return Object.entries(summary);
  }
}
