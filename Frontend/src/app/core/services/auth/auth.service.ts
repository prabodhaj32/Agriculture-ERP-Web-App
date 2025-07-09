import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { User } from '../../models/user.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromLocalStorage());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          // Store tokens
          this.tokenService.setAccessToken(response.accessToken);
          this.tokenService.setRefreshToken(response.refreshToken);
          
          // Store user info
          const user: User = {
            id: response.user.id,
            email: response.user.email,
            firstName: response.user.firstName,
            lastName: response.user.lastName,
            role: response.user.role,
            permissions: response.user.permissions || []
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData)
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.tokenService.getRefreshToken();
    return this.http.post<any>(`${this.apiUrl}/refresh-token`, { refreshToken })
      .pipe(
        tap(response => {
          this.tokenService.setAccessToken(response.accessToken);
          // Sometimes the API might also return a new refresh token
          if (response.refreshToken) {
            this.tokenService.setRefreshToken(response.refreshToken);
          }
        }),
        catchError(error => {
          // If refresh token is invalid, log out the user
          this.logout();
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    // Clear tokens
    this.tokenService.removeTokens();
    
    // Clear user data
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    
    // Navigate to login
    this.router.navigate(['/auth/login']);
  }

  hasPermission(permission: string): boolean {
    const user = this.currentUserValue;
    if (!user || !user.permissions) return false;
    
    return user.permissions.includes(permission) || user.permissions.includes('ADMIN');
  }

  private getUserFromLocalStorage(): User | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }
}