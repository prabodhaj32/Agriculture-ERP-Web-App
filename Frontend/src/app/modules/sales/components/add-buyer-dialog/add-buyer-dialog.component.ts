import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Buyer } from '../../models/buyer.model';

@Component({
  selector: 'app-add-buyer-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-buyer-dialog.component.html',
})
export class AddBuyerDialogComponent {
  newBuyer: Buyer = { id: 0, name: '', email: '', phone: '' };

  constructor(private dialogRef: MatDialogRef<AddBuyerDialogComponent>) {}

  submit() {
    if (this.newBuyer.name && this.newBuyer.email && this.newBuyer.phone) {
      this.dialogRef.close(this.newBuyer);
    }
  }

  close() {
    this.dialogRef.close(null);
  }
}
