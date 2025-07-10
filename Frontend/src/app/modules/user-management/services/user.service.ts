import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

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
      },
    ]);
  }

  getUsers() {
    return this.users$.asObservable();
  }

  addUser(user: User) {
    const current = this.users$.getValue();
    this.users$.next([...current, { ...user, id: Date.now().toString(), isActive: true }]);
  }

  updateUser(updatedUser: User) {
    const updatedList = this.users$.getValue().map(u =>
      u.id === updatedUser.id ? { ...u, ...updatedUser } : u
    );
    this.users$.next(updatedList);
  }

  toggleUserStatus(id: string) {
    const updatedList = this.users$.getValue().map(user =>
      user.id === id ? { ...user, isActive: !user.isActive } : user
    );
    this.users$.next(updatedList);
  }
}
