import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  Inject,
  Optional
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  // ✅ This must exist to avoid assignedField errors
  assignedField: string = 'Tea';

  constructor(
    private userService: UserService,
    private location: Location,
    @Optional() public dialogRef: MatDialogRef<UserFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {}

  ngOnInit() {
    // If using dialog and user data is passed
    if (this.data?.user) {
      this.user = { ...this.data.user };
    }

    if (this.user?.assignedFields?.length) {
      this.assignedField = this.user.assignedFields[0];
    }
  }

  onSubmit() {
    this.user.assignedFields = [this.assignedField];

    const action$ = this.user.id
      ? this.userService.updateUser(this.user)
      : this.userService.addUser(this.user);

    action$.subscribe(() => {
      this.formSubmit.emit();

      // If in dialog, close after submit
      if (this.dialogRef) {
        this.dialogRef.close();
      } else {
        this.resetForm();
      }
    });
  }

  // ✅ Make sure this method exists
  onCancel() {
    this.resetForm(); // Resets the form fields
    if (this.dialogRef) {
      this.dialogRef.close(); // Closes dialog if it's a popup
    }
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
