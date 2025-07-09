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
          // children: [{ label: 'Nfts', route: '/dashboard/nfts' }],
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
          
        },
        {
          icon: 'assets/icons/heroicons/outline/world-1-svgrepo-com.svg',
          label: 'Field Management',
          route: '/Field Management',
          
        
        },
         {
          icon: 'assets/icons/heroicons/outline/planning-poker-svgrepo-com.svg',
          label: 'Planning',
          route: '/Planning',
        
        },
         {
          icon: 'assets/icons/heroicons/outline/activity-log-svgrepo-com.svg',
          label: 'Activity Log',
          route: '/Activity Log',
        
        },
         {
          icon: 'assets/icons/heroicons/outline/harvest-svgrepo-com.svg',
          label: 'Harvest',
          route: '/Harvest',
        
        },
         {
          icon: 'assets/icons/heroicons/outline/fertilizer-fragrance-perfume-spray-svgrepo-com.svg',
          label: 'Fertilizer',
          route: '/Fertilizer',
        
        },
         {
          icon: 'assets/icons/heroicons/outline/dollar-circle-list-svgrepo-com.svg',
          label: 'Financials',
          route: '/Financials',
        
        },
         {
          icon: 'assets/icons/heroicons/outline/business-financial-graph-svgrepo-com.svg',
          label: 'Sales',
          route: '/Sales',
        
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
          route: '/Monitoring',
        },
        {
          icon: 'assets/icons/heroicons/outline/book-svgrepo-com.svg',
          label: 'Knowledge Center',
          route: '/Knowledge Center',
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
          route: '/Reports',
          // children: [
          //   { label: 'Current Files', route: '/folders/current-files' },
          //   { label: 'Downloads', route: '/folders/download' },
          //   { label: 'Trash', route: '/folders/trash' },
          // ],
        },
      ],
    },
  ];
}
