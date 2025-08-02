import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UserFormComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    MatMenuModule
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users: User[] = [];
  selectedUser: User | null = null;

  displayedColumns: string[] = [
    'fullName',
    'email',
    'phone',
    'role',
    'password',
    'assignedFields',
    'status',
    'actions',
  ];

  // Inject MatDialog here along with UserService
  constructor(private userService: UserService, private dialog: MatDialog) {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }

  editUser(user: User) {
    this.selectedUser = { ...user };
  }

  toggleStatus(user: User) {
    const updated = { ...user, isActive: !user.isActive };
    this.userService.updateUser(updated).subscribe(() => this.loadUsers());
  }

  onUserUpdated() {
    this.selectedUser = null;
    this.loadUsers();
  }

  openAddUserPopup() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px',
      data: {
        user: {
          fullName: '',
          email: '',
          phone: '',
          role: 'FieldOfficer',
          password: '',
          assignedFields: [],
        },
      },
    });

    dialogRef.componentInstance.formSubmit.subscribe(() => {
      dialogRef.close();
      this.loadUsers();
    });
  }
}
