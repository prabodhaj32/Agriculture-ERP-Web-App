import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users$ = new BehaviorSubject<User[]>([]);

  constructor() {
    this.users$.next([
      {
        id: '1',
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        role: 'Admin',
        isActive: true,
        assignedFields: ['Field A'],
        password: 'secret', 
      },
    ]);
  }

  getUsers(): Observable<User[]> {
    return this.users$.asObservable();
  }

  addUser(user: User): Observable<void> {
    const current = this.users$.getValue();
    this.users$.next([
      ...current,
      { ...user, id: Date.now().toString(), isActive: true },
    ]);
    return of(void 0); // ✅ Return Observable<void>
  }

  updateUser(updatedUser: User): Observable<void> {
    const updatedList = this.users$.getValue().map((u) =>
      u.id === updatedUser.id ? { ...u, ...updatedUser } : u
    );
    this.users$.next(updatedList);
    return of(void 0); // ✅ Return Observable<void>
  }

  toggleUserStatus(id: string): Observable<void> {
    const updatedList = this.users$.getValue().map((user) =>
      user.id === id ? { ...user, isActive: !user.isActive } : user
    );
    this.users$.next(updatedList);
    return of(void 0); // ✅ Return Observable<void>
  }
}
