import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { Sale } from '../../models/sale.model';
import { Buyer } from '../../models/buyer.model';
import { Subscription } from 'rxjs';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-sale-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './new-sale-form.component.html',
})
export class NewSaleFormComponent implements OnInit, OnDestroy {
  items: string[] = ['Tea Bags', 'Loose Tea', 'Green Tea', 'Black Tea', 'Herbal Blend'];
  sale: Partial<Sale> = {};
  buyers: Buyer[] = [];
  private buyerSub!: Subscription;

  constructor(
    private salesService: SalesService,
    @Optional() public dialogRef?: MatDialogRef<NewSaleFormComponent>
  ) {}

  ngOnInit() {
    this.buyerSub = this.salesService.buyers$.subscribe(buyers => {
      this.buyers = buyers;
    });
  }

  ngOnDestroy() {
    this.buyerSub.unsubscribe();
  }

  calculateTotal() {
    if (this.sale.quantity && this.sale.unitPrice) {
      this.sale.total = this.sale.quantity * this.sale.unitPrice;
    }
  }

  onCancel() {
  // Your cancel logic here, for example:
  this.sale = {};  // reset form model
  if (this.dialogRef) {
    this.dialogRef.close();  // close the dialog if opened as a dialog
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
        dueAmount,
      } as Sale;

      this.salesService.addSale(newSale);

      alert('Sale recorded!');

      if (this.dialogRef) {
        this.dialogRef.close(newSale); // ✅ Close once
      }
      
    }
  }
}
