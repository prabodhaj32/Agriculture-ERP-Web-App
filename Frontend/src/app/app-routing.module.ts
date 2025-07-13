import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
 {
    path: 'user-management',
    loadChildren: () =>
      import('./modules/user-management/user-management.module').then((m) => m.UserManagementModule)
  },
  {
  path: 'fields',
  loadChildren: () =>
    import('./modules/field-management/field-management.module').then(m => m.FieldManagementModule),
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
