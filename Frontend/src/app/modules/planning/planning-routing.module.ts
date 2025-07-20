import { Routes, RouterModule } from '@angular/router';
import { PlanningComponent } from './planning.component';

const routes: Routes = [
  { path: '', component: PlanningComponent }
];

export const PlanningRoutingModule = RouterModule.forChild(routes);
