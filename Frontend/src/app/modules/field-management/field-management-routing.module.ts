import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FieldManagementComponent } from './field-management.component';
import { FieldFormComponent } from './components/field-form/field-form.component';
import { FieldListComponent } from './components/field-list/field-list.component';
import { FieldMapComponent } from './components/field-map/field-map.component';

const routes: Routes = [
  
  { path: 'field-list', component: FieldListComponent },
    { path: 'field-form', component: FieldFormComponent },
     { path: 'fields/map', component: FieldMapComponent }, // ✅ this is required
    { path: '', redirectTo: 'user-list', pathMatch: 'full' },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FieldManagementRoutingModule {}
