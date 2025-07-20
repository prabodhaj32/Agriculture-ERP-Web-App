
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Store users 
  private users$ = new BehaviorSubject<User[]>([]);

  constructor() {
    //  users or load from storage
    this.users$.next([
      {
        id: '1',
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '123456789',
        role: 'FieldOfficer',
        password: '',
        assignedFields: ['Tea']
      }
    ]);
  }

  // Observable to get current users
  getUsers(): Observable<User[]> {
    return this.users$.asObservable();
  }

  // Add a new user
  addUser(user: User): Observable<void> {
    const currentUsers = this.users$.getValue();

    // If user doesn't have an id, generate one
    if (!user.id) {
      user.id = this.generateId();
    }

    this.users$.next([...currentUsers, user]);
    return of(void 0); // Return Observable<void>
  }

  // Update existing user by id
  updateUser(updatedUser: User): Observable<void> {
    const updatedList = this.users$.getValue().map(user =>
      user.id === updatedUser.id ? { ...user, ...updatedUser } : user
    );
    this.users$.next(updatedList);
    return of(void 0); // Return Observable<void>
  }

  // Delete a user by id (optional)
  deleteUser(id: string): Observable<void> {
    const filteredUsers = this.users$.getValue().filter(user => user.id !== id);
    this.users$.next(filteredUsers);
    return of(void 0);
  }

  // Utility to generate a random id
  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}