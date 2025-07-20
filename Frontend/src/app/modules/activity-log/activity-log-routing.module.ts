import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityLogComponent } from './activity-log.component';

const routes: Routes = [
  { path: 'activity-log', component: ActivityLogComponent },
  { path: '', redirectTo: 'activity-log', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityLogRoutingModule {}
