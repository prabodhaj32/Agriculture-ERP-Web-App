import { Component } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import jsPDF from 'jspdf';

@Component({
  selector: 'app-invoice-preview',
  standalone: true,
  imports: [CommonModule, FormsModule,MatTableModule,MatButtonModule,MatDialogModule,MatCardModule],
  templateUrl: './invoice-preview.component.html',
})
export class InvoicePreviewComponent {
  displayedColumns: string[] = ['buyer', 'item', 'quantity', 'total', 'deliveryDate', 'action'];
  sales = this.salesService.getSales();
  selectedInvoice: any = null;

  constructor(private salesService: SalesService) {}

  showInvoice(sale: any) {
    this.selectedInvoice = sale;
  }

  async savePdf() {
    if (!this.selectedInvoice) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Invoice', 14, 22);

    doc.setFontSize(12);
    doc.text(`Buyer: ${this.selectedInvoice.buyer}`, 14, 40);
    doc.text(`Item: ${this.selectedInvoice.item}`, 14, 50);
    doc.text(`Quantity: ${this.selectedInvoice.quantity}`, 14, 60);
    doc.text(`Unit Price: Rs. ${this.selectedInvoice.unitPrice}`, 14, 70);
    doc.text(`Total: Rs. ${this.selectedInvoice.total}`, 14, 80);
    doc.text(`Delivery Date: ${this.selectedInvoice.deliveryDate}`, 14, 90);

    doc.save(`Invoice_${this.selectedInvoice.buyer}.pdf`);
  }

  closePreview() {
    this.selectedInvoice = null;
  }
}
