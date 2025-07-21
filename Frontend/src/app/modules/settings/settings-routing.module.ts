import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSettingsComponent } from './pages/admin-settings/admin-settings.component';

const routes: Routes = [
  { path: '', component: AdminSettingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
