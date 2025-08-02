import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-attendance-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './attendance-form.component.html',
  styleUrl: './attendance-form.component.css'
})
export class AttendanceFormComponent {
  attendance = {
    workerName: '',
    field: '',
    inTime: '',
    outTime: '',
  };

  submitAttendance() {
    const { workerName, field, inTime, outTime } = this.attendance;

    if (!workerName || !field || !inTime || !outTime) {
      alert('Please fill in all fields.');
      return;
    }

    console.log('Attendance Submitted:', this.attendance);
    alert('Attendance Submitted!');

    // Reset form fields
    this.attendance = {
      workerName: '',
      field: '',
      inTime: '',
      outTime: '',
    };
  }
}
