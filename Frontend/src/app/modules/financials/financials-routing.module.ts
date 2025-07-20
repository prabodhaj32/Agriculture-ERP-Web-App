import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialsComponent } from './financials.component';



const routes: Routes = [
  { path: 'financials', component: FinancialsComponent},
  { path: '', redirectTo: 'financials', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialsRoutingModule {}
