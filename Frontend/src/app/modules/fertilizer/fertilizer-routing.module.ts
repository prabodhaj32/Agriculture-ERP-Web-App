import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';
import { ApplicationFormComponent } from './components/application-form/application-form.component';

const routes: Routes = [
  { path: 'inventory', component: InventoryFormComponent },
  { path: 'application', component: ApplicationFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FertilizerRoutingModule {}
