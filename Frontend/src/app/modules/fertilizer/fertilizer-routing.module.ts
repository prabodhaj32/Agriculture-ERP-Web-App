import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FertilizerComponent } from './fertilizer.component';


const routes: Routes = [
  { path: '', redirectTo: 'fertilizer', pathMatch: 'full' },
  { path: 'fertilizer', component: FertilizerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FertilizerRoutingModule {}
