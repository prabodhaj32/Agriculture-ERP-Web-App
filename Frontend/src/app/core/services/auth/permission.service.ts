import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private authService: AuthService) { }

  /**
   * Check if user has a specific permission
   * @param permission Permission to check
   * @returns boolean indicating if user has permission
   */
  hasPermission(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }

  /**
   * Check if user has at least one of the permissions
   * @param permissions Array of permissions to check
   * @returns boolean indicating if user has at least one permission
   */
  hasAnyPermission(permissions: string[]): boolean {
    if (!permissions || permissions.length === 0) return true;
    
    for (const permission of permissions) {
      if (this.hasPermission(permission)) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Check if user has all of the permissions
   * @param permissions Array of permissions to check
   * @returns boolean indicating if user has all permissions
   */
  hasAllPermissions(permissions: string[]): boolean {
    if (!permissions || permissions.length === 0) return true;
    
    for (const permission of permissions) {
      if (!this.hasPermission(permission)) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Get menu items based on user permissions
   * @returns Array of menu items the user has access to
   */
  getAuthorizedMenuItems() {
    const allMenuItems = [
      {
        title: 'Dashboard',
        icon: 'dashboard',
        route: '/dashboard',
        permission: 'VIEW_DASHBOARD'
      },
      {
        title: 'Sales',
        icon: 'trending_up',
        route: '/sales',
        permission: 'VIEW_SALES'
      },
      {
        title: 'Purchase',
        icon: 'shopping_cart',
        route: '/purchase',
        permission: 'VIEW_PURCHASE'
      }
    ];
    
    return allMenuItems.filter(item => this.hasPermission(item.permission));
  }
}