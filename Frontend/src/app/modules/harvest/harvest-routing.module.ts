// harvest-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HarvestComponent } from './harvest.component';
import { HarvestFormComponent } from './components/harvest-form/harvest-form.component';
import { HarvestSummaryComponent } from './components/harvest-summary/harvest-summary.component';
import { PlannedVsActualComponent } from './components/planned-vs-actual/planned-vs-actual.component';

const routes: Routes = [
  {
    path: '',
    component: HarvestComponent,
    children: [
      { path: 'harvest-entry', component: HarvestFormComponent },
      { path: 'harvest-summary', component: HarvestSummaryComponent },
      { path: 'planned-vs-actual', component: PlannedVsActualComponent },
      { path: '', redirectTo: 'harvest-entry', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HarvestRoutingModule {}
