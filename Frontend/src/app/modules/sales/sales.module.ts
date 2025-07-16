import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerCrmComponent } from './components/buyer-crm/buyer-crm.component';
import { NewSaleFormComponent } from './components/new-sale-form/new-sale-form.component';
import { SalesTrackerComponent } from './components/sales-tracker/sales-tracker.component';
import { InvoicePreviewComponent } from './components/invoice-preview/invoice-preview.component';

import { SalesRoutingModule } from './sales-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SalesRoutingModule,           // import routing here
    BuyerCrmComponent,            // import standalone components
    NewSaleFormComponent,
    SalesTrackerComponent,
    InvoicePreviewComponent,
  ],
})
export class SalesModule {}
