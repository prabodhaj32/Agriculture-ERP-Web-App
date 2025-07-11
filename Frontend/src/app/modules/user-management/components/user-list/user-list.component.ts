import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, UserFormComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  

  selectedUser: User = {
    fullName: '',
    email: '',
    phone: '',
    role: 'FieldOfficer',
    password: '',
    assignedFields: []
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }

  editUser(user: User) {
    this.selectedUser = { ...user };
  }

  toggleStatus(user: User) {
    if (user.id) {
      this.userService.toggleUserStatus(user.id);
    }
  }
}
