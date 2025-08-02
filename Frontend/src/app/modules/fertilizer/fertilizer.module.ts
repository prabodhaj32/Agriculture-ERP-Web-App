import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FertilizerRoutingModule } from './fertilizer-routing.module';

import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';
import { ApplicationFormComponent } from './components/application-form/application-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FertilizerRoutingModule,
    InventoryFormComponent,     
    ApplicationFormComponent      
  ],
})
export class FertilizerModule {}
