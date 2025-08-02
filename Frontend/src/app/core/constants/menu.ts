import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Base',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/dashboard-svgrepo-com.svg',
          label: 'Dashboard',
          route: '/dashboard',
        },
        // {
        //   icon: 'assets/icons/heroicons/outline/lock-closed-outline-svgrepo-com.svg',
        //   label: 'Auth',
        //   route: '/auth',
        //   children: [
        //     { label: 'Sign up', route: '/auth/sign-up' },
        //     { label: 'Sign in', route: '/auth/sign-in' },
        //     { label: 'Forgot Password', route: '/auth/forgot-password' },
        //     { label: 'New Password', route: '/auth/new-password' },
        //     { label: 'Two Steps', route: '/auth/two-steps' },
        //   ],
        // },
        
        {
          icon: 'assets/icons/heroicons/outline/world-1-svgrepo-com.svg',
          label: 'Field Management',
          route: '/field-management',
        },
        {
          icon: 'assets/icons/heroicons/outline/planning-poker-svgrepo-com.svg',
          label: 'Planning',
          route: '/planning',
          // children: [
          //   { label: 'Task Form', route: '/planning/form' },
          //   { label: 'Task List', route: '/planning/list' },
          //   { label: 'Task Calendar', route: '/planning/calendar' },

          // ],
        },
        {
          icon: 'assets/icons/heroicons/outline/activity-log-svgrepo-com.svg',
          label: 'Activity Log',
          route: '/activity-log',
          // children: [
          //   { label: 'Daily Task', route: '/activity-log/daily-task' },
          //   { label: 'Attendance Form', route: '/activity-log/attendance' },
          //   { label: 'Task Summary', route: '/activity-log/summary' },
          // ],
        },
        {
          icon: 'assets/icons/heroicons/outline/harvest-svgrepo-com.svg',
          label: 'Harvest',
          route: '/harvest',
          // children: [
          //   { label: 'Harvest Form', route: '/harvest/harvest-entry' },
          //   { label: 'Harvest Summary', route: '/harvest/harvest-summary' },
          //   { label: 'Planned vs. Actual Yield', route: '/harvest/planned-vs-actual' },
          // ],
        },
        {
          icon: 'assets/icons/heroicons/outline/fertilizer-fragrance-perfume-spray-svgrepo-com.svg',
          label: 'Fertilizer',
          route: '/fertilizer',
          // children: [
          //   { label: 'Inventory Form', route: '/fertilizer/inventory' },
          //   { label: 'Application Form', route: '/fertilizer/application' },
          // ],
        },
        {
          icon: 'assets/icons/heroicons/outline/dollar-circle-list-svgrepo-com.svg',
          label: 'Financials',
          route: '/financials',
          // children: [
          //   { label: 'Expense Entry', route: '/financials/expenses' },
          //   { label: 'Revenue Entry', route: '/financials/revenues' },
          //   { label: 'Cost Comparison', route: '/financials/cost-comparison' },
          //   { label: 'Income vs Expense Chart', route: '/financials/income-expense-chart' },
          // ],
        },
        {
          icon: 'assets/icons/heroicons/outline/business-financial-graph-svgrepo-com.svg',
          label: 'Sales',
          route: '/sales',
          // children: [
          //   { label: 'Buyers', route: '/sales/buyers' },
          //   { label: 'New Sale', route: '/sales/new-sale' },
          //   { label: 'Invoices', route: '/sales/invoices' },
          //   { label: 'Sales Tracker', route: '/sales/tracker' },
          // ],
        },
      ],
    },
    {
      group: 'Integrations',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/monitoring-health-svgrepo-com.svg',
          label: 'Monitoring',
          route: '/monitoring',
        },
        {
          icon: 'assets/icons/heroicons/outline/book-svgrepo-com.svg',
          label: 'Knowledge Center',
          route: '/knowledge-center',
        },
      ],
    },
    {
      group: 'Reports',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/reports-svgrepo-com.svg',
          label: 'Reports',
          route: '/reports',
        },
        {
          icon: 'assets/icons/heroicons/outline/user-plus-01-svgrepo-com.svg',
          label: 'User Management',
          route: '/user-management',
          // children: [
          //   { label: 'User Form', route: '/user-management/user-form' },
          //   { label: 'User List', route: '/user-management/user-list' },
          // ],
        },
        {
          icon: 'assets/icons/heroicons/outline/settings-svgrepo-com.svg',
          label: 'Settings',
          route: '/settings',
        },

      ],
    },
  ];
}
