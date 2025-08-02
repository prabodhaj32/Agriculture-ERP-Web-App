import { Component } from '@angular/core';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [UserListComponent, UserFormComponent],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {}
