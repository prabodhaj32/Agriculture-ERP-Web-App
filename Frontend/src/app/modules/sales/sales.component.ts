import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BuyerCrmComponent } from './components/buyer-crm/buyer-crm.component';
import { InvoicePreviewComponent } from './components/invoice-preview/invoice-preview.component';
import { NewSaleFormComponent } from './components/new-sale-form/new-sale-form.component';
import { SalesTrackerComponent } from './components/sales-tracker/sales-tracker.component';
import { AddBuyerDialogComponent } from './components/add-buyer-dialog/add-buyer-dialog.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    CommonModule,
    BuyerCrmComponent,
    InvoicePreviewComponent,
    NewSaleFormComponent,
    SalesTrackerComponent,
    AddBuyerDialogComponent
  ],
  templateUrl: './sales.component.html',
})
export class SalesComponent {}
