import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewSaleFormComponent } from './components/new-sale-form/new-sale-form.component';
import { InvoicePreviewComponent } from './components/invoice-preview/invoice-preview.component';
import { BuyerCrmComponent } from './components/buyer-crm/buyer-crm.component';
import { SalesTrackerComponent } from './components/sales-tracker/sales-tracker.component';

const routes: Routes = [
  { path: 'new-sale', component: NewSaleFormComponent },
  { path: 'invoices', component: InvoicePreviewComponent },
  { path: 'buyers', component: BuyerCrmComponent },
  { path: 'tracker', component: SalesTrackerComponent },
  { path: '', redirectTo: 'new-sale', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {}
