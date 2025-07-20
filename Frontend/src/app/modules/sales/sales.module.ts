import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerCrmComponent } from './components/buyer-crm/buyer-crm.component';
import { NewSaleFormComponent } from './components/new-sale-form/new-sale-form.component';
import { SalesTrackerComponent } from './components/sales-tracker/sales-tracker.component';
import { InvoicePreviewComponent } from './components/invoice-preview/invoice-preview.component';

import { SalesRoutingModule } from './sales-routing.module';
import { AddBuyerDialogComponent } from './components/add-buyer-dialog/add-buyer-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SalesRoutingModule,           
    BuyerCrmComponent,            
    NewSaleFormComponent,
    SalesTrackerComponent,
    InvoicePreviewComponent,
    AddBuyerDialogComponent
  ],
})
export class SalesModule {}
