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
        {
          icon: 'assets/icons/heroicons/outline/lock-closed-outline-svgrepo-com.svg',
          label: 'Auth',
          route: '/auth',
          children: [
            { label: 'Sign up', route: '/auth/sign-up' },
            { label: 'Sign in', route: '/auth/sign-in' },
            { label: 'Forgot Password', route: '/auth/forgot-password' },
            { label: 'New Password', route: '/auth/new-password' },
            { label: 'Two Steps', route: '/auth/two-steps' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/user-plus-01-svgrepo-com.svg', 
          label: 'User Management',
          route: '/user-management',
           children: [
           { label: 'User Form', route: '/user-management/user-form' }, 
           { label: 'User List', route: '/user-management/user-list' }, 
            
    
  ],
          
        },
        {
          icon: 'assets/icons/heroicons/outline/world-1-svgrepo-com.svg',
          label: 'Field Management',
          route: '/field-management',
           children: [
    
           { label: 'Field List', route: '/field-management/field-list' }, 
            
    
  ],

        },
        {
  icon: 'assets/icons/heroicons/outline/planning-poker-svgrepo-com.svg',
  label: 'Planning',
  route: '/planning',
  children: [
    { label: 'Task Form', route: '/planning/form' },   // ✅ match route
    { label: 'Task List', route: '/planning/list' },   // ✅ match route
    { label: 'Task Calendar', route: '/planning/calendar' },
    // Optional calendar view:
    // { label: 'Task Calendar', route: '/planning/calendar' }
  ],
},
        {
  icon: 'assets/icons/heroicons/outline/activity-log-svgrepo-com.svg',
  label: 'Activity Log',
  route: '/activity-log',
  children: [
    { label: 'Daily Task', route: '/activity-log/daily-task' },
    { label: 'Attendance Form', route: '/activity-log/attendance' },
    { label: 'Task Summary', route: '/activity-log/summary' },
  ]
},
        {
          icon: 'assets/icons/heroicons/outline/harvest-svgrepo-com.svg',
          label: 'Harvest',
          route: '/harvest',
        },
        {
          icon: 'assets/icons/heroicons/outline/fertilizer-fragrance-perfume-spray-svgrepo-com.svg',
          label: 'Fertilizer',
          route: '/fertilizer',
        },
        {
          icon: 'assets/icons/heroicons/outline/dollar-circle-list-svgrepo-com.svg',
          label: 'Financials',
          route: '/financials',
        },
        {
          icon: 'assets/icons/heroicons/outline/business-financial-graph-svgrepo-com.svg',
          label: 'Sales',
          route: '/sales',
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
      ],
    },
  ];
}
