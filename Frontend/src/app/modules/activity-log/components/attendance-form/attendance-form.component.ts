import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-attendance-form',
  standalone: true,
  imports: [CommonModule, FormsModule,MatButtonModule],
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
    console.log('Attendance Submitted:', this.attendance);
    alert("Attendance Submitted!");
  }
}