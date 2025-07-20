import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './application-form-dialog.component.html',
})
export class ApplicationFormDialogComponent {
  entry = {
    field: '',
    date: '',
    item: '',
    quantityApplied: 0,
    appliedBy: ''
  };

  constructor(private dialogRef: MatDialogRef<ApplicationFormDialogComponent>) {}

  submit() {
    this.dialogRef.close(this.entry);
  }

  close() {
    this.dialogRef.close(null);
  }
}
