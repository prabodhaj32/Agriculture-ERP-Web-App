import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
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
export class UserFormComponent implements OnChanges {
  @Input() user!: User; // will be passed from parent
  @Output() formSubmitted = new EventEmitter<void>(); // notify parent

  formUser: User = this.getEmptyUser();
  fieldInput: string = '';

  constructor(private userService: UserService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.formUser = { ...this.user };
      this.fieldInput = this.formUser.assignedFields?.join(', ') || '';
    }
  }

  onSubmit() {
    this.formUser.assignedFields = this.fieldInput.split(',').map(f => f.trim());

    if (this.formUser.id) {
      this.userService.updateUser(this.formUser);
    } else {
      this.userService.addUser(this.formUser);
    }

    this.formSubmitted.emit(); // notify parent to close form or refresh
    this.resetForm();
  }

  resetForm() {
    this.formUser = this.getEmptyUser();
    this.fieldInput = '';
  }

  getEmptyUser(): User {
    return {
      fullName: '',
      email: '',
      phone: '',
      role: 'FieldOfficer',
      password: '',
      assignedFields: []
    };
  }
}