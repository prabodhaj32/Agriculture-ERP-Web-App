import { Component } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { Sale } from '../../models/sale.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-sale-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-sale-form.component.html',
})
export class NewSaleFormComponent {
  items: string[] = ['Tea Bags', 'Loose Tea', 'Green Tea', 'Black Tea', 'Herbal Blend'];
  sale: Partial<Sale> = {};
  buyers = this.salesService.getBuyers();

  constructor(private salesService: SalesService) {}

  calculateTotal() {
    if (this.sale.quantity && this.sale.unitPrice) {
      this.sale.total = this.sale.quantity * this.sale.unitPrice;
    }
  }

  submitSale() {
    if (
      this.sale.buyer &&
      this.sale.item &&
      this.sale.quantity &&
      this.sale.unitPrice &&
      this.sale.deliveryDate &&
      this.sale.amountPaid !== undefined
    ) {
      const total = this.sale.quantity * this.sale.unitPrice;
      const dueAmount = total - this.sale.amountPaid;

      const newSale: Sale = {
        ...this.sale,
        id: Date.now(),
        total,
        dueAmount
      } as Sale;

      this.salesService.addSale(newSale);
      alert('Sale recorded!');
      this.sale = {};
    }
  }
}
