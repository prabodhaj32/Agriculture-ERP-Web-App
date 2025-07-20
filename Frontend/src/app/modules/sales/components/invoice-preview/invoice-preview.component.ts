import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { SalesService } from '../../services/sales.service';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { NewSaleFormComponent } from '../new-sale-form/new-sale-form.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-invoice-preview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    NewSaleFormComponent,
     MatIconModule
  ],
  templateUrl: './invoice-preview.component.html',
})
export class InvoicePreviewComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['buyer', 'item', 'quantity', 'total', 'deliveryDate', 'action'];
  sales: any[] = [];
  selectedInvoice: any = null;

  private salesSub!: Subscription;

  constructor(private salesService: SalesService, private dialog: MatDialog, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.salesSub = this.salesService.sales$.subscribe(sales => {
      this.sales = sales;
    });
  }

  ngOnDestroy() {
    if (this.salesSub) this.salesSub.unsubscribe();
  }

  openNewSaleDialog() {
    const dialogRef = this.dialog.open(NewSaleFormComponent, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New sale added:', result);
        this.cd.detectChanges();
      }
    });
  }

  showInvoice(sale: any) {
    this.selectedInvoice = sale;
  }

  closePreview() {
    this.selectedInvoice = null;
  }

  savePdf() {
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
}
