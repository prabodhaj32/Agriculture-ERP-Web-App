import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Check if user is logged in
    if (!this.authService.currentUserValue) {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    
    // Check permissions if they are specified on the route
    if (route.data && route.data['permission']) {
      const permission = route.data['permission'] as string;
      if (!this.authService.hasPermission(permission)) {
        // Navigate to dashboard or unauthorized page
        this.router.navigate(['/dashboard']);
        return false;
      }
    }
    
    return true;
  }
}