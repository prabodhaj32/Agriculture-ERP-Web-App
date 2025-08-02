import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
//    {
//   path: 'login',
//   loadComponent: () => import('../login/login.component').then(m => m.LoginComponent),
// },

  
  {
    path: '',
    component: LayoutComponent,
    children: [

      
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'auth',
        loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'user-management',
        loadChildren: () => import('../user-management/user-management.module').then((m) => m.UserManagementModule),
      },

      {
        path: 'field-management',
        loadChildren: () => import('../field-management/field-management.module').then((m) => m.FieldManagementModule),
      },
      {
        path: 'planning',
        loadChildren: () => import('../planning/planning.module').then((m) => m.PlanningModule),
      },
      {
        path: 'activity-log',
        loadChildren: () => import('../activity-log/activity-log.module').then((m) => m.ActivityLogModule),
      },
      {
        path: 'harvest',
        loadChildren: () => import('../harvest/harvest.module').then((m) => m.HarvestModule),
      },
      {
        path: 'fertilizer',
        loadChildren: () => import('../fertilizer/fertilizer.module').then((m) => m.FertilizerModule),
      },
      {
        path: 'financials',
        loadChildren: () => import('../financials/financials.module').then((m) => m.FinancialsModule),
      },
      {
        path: 'sales',
        loadChildren: () => import('../sales/sales.module').then((m) => m.SalesModule),
      },
      {
        path: 'monitoring',
        loadChildren: () => import('../smart-monitoring/smart-monitoring.module').then((m) => m.SmartMonitoringModule),
      },
      {
        path: 'knowledge-center',
        loadChildren: () => import('../knowledge-center/knowledge-center.module').then((m) => m.KnowledgeCenterModule),
      },
      {
        path: 'reports',
        loadChildren: () => import('../reports/reports.module').then((m) => m.ReportsModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then((m) => m.SettingsModule),
      },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
