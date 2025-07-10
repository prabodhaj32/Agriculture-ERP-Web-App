import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  @Input() user: User = {
    fullName: '',
    email: '',
    phone: '',
    role: 'FieldOfficer',
    password: '',
    assignedFields: []
  };

  fieldInput: string = '';

  constructor(private userService: UserService) {}

  onSubmit() {
    this.user.assignedFields = this.fieldInput.split(',').map((f) => f.trim());

    if (this.user.id) {
      this.userService.updateUser(this.user);
    } else {
      this.userService.addUser(this.user);
    }

    // Clear form after submit (optional)
    this.user = {
      fullName: '',
      email: '',
      phone: '',
      role: 'FieldOfficer',
      password: '',
      assignedFields: []
    };
    this.fieldInput = '';
  }
}
