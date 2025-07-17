import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-form',
  standalone: true,
   imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() user: User = {
    fullName: '',
    email: '',
    phone: '',
    role: 'FieldOfficer',
    password: '',
    assignedFields: []
  };

  @Output() formSubmit = new EventEmitter<void>();

  // Add this property
  assignedField: string = 'Tea';

    constructor(private userService: UserService, private location: Location) {}
  
ngOnInit() {
  if (this.user?.assignedFields?.length) {
    this.assignedField = this.user.assignedFields[0];
  }
}
  onSubmit() {
    // Convert single field to array before saving
    this.user.assignedFields = [this.assignedField];

    if (this.user.id) {
      this.userService.updateUser(this.user).subscribe(() => this.formSubmit.emit());
    } else {
   this.userService.addUser(this.user).subscribe(() => {
        this.formSubmit.emit();
        this.resetForm();
      });
    }
  }
   goBack(): void {
    this.location.back();
  }

  resetForm() {
    this.user = {
      fullName: '',
      email: '',
      phone: '',
      role: 'FieldOfficer',
      password: '',
      assignedFields: []
    };
    this.assignedField = 'Tea';
  }
  
}
