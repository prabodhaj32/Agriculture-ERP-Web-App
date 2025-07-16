import { Component } from '@angular/core';
import { Buyer } from '../../models/buyer.model';
import { SalesService } from '../../services/sales.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-buyer-crm',
   standalone: true,
    imports: [CommonModule, FormsModule,],
  templateUrl: './buyer-crm.component.html',
})
export class BuyerCrmComponent {
  buyers = this.salesService.getBuyers();
  newBuyer: Partial<Buyer> = {};
  editBuyer: Buyer | null = null;
  notification: string | null = null;
  notificationType: 'success' | 'error' | 'warning' = 'success';

  constructor(private salesService: SalesService) {}

  addBuyer() {
    if (this.newBuyer.name && this.newBuyer.email && this.newBuyer.phone) {
      this.salesService.addBuyer(this.newBuyer as Buyer);
      this.newBuyer = {};
      this.refreshBuyers();
      this.showNotification('Buyer added successfully!', 'success');
    }
  }

  edit(b: Buyer) {
    this.editBuyer = { ...b };
  }

  saveEdit() {
    if (this.editBuyer) {
      this.salesService.updateBuyer(this.editBuyer);
      this.editBuyer = null;
      this.refreshBuyers();
      this.showNotification('Buyer updated successfully!', 'success');
    }
  }

  delete(id: number) {
    if (confirm('Delete this buyer?')) {
      this.salesService.deleteBuyer(id);
      this.refreshBuyers();
      this.showNotification('Buyer deleted successfully!', 'success');
    }
  }

  refreshBuyers() {
    this.buyers = this.salesService.getBuyers();
  }

  showNotification(message: string, type: 'success' | 'error' | 'warning' = 'success') {
    this.notification = message;
    this.notificationType = type;
    setTimeout(() => {
      this.notification = null;
    }, 3000); // hide after 3 seconds
  }
}
