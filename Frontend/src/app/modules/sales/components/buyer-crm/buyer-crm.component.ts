import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Buyer } from '../../models/buyer.model';
import { SalesService } from '../../services/sales.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddBuyerDialogComponent } from '../add-buyer-dialog/add-buyer-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-buyer-crm',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './buyer-crm.component.html',
})
export class BuyerCrmComponent {
  buyers: Buyer[] = [];
  notification: string | null = null;
  notificationType: 'success' | 'error' | 'warning' = 'success';

  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];

  constructor(
    private salesService: SalesService,
    private dialog: MatDialog
  ) {
    this.refreshBuyers();
  }

  openAddBuyerDialog() {
    const dialogRef = this.dialog.open(AddBuyerDialogComponent, {
      width: '500px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: Buyer | null) => {
      if (result) {
        this.salesService.addBuyer(result);
        this.refreshBuyers();
        this.showNotification('Buyer added successfully!', 'success');
      }
    });
  }

  edit(b: Buyer) {
    // Implement edit logic
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
    }, 3000);
  }
}
