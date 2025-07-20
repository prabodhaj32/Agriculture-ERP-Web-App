import { Component, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivityLogService } from '../../services/activity-log.service';
import { DailyTask } from '../../Model/daily-task.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-daily-task-form',
  standalone: true,
  imports: [FormsModule, MatButtonModule],
  templateUrl: './daily-task-form.component.html',
  styleUrls: ['./daily-task-form.component.css'],
})
export class DailyTaskFormComponent {
  task: DailyTask = {
    field: '',
    taskType: '',
    workerName: '',
    duration: 0,
    remarks: '',
    date: new Date().toISOString().split('T')[0], // today
    photos: [],
  };

  constructor(
    private activityService: ActivityLogService,
    @Optional() private dialogRef?: MatDialogRef<DailyTaskFormComponent>
  ) {}

  onFileChange(event: any) {
    const files: FileList = event.target.files;
    const base64Photos: string[] = [];

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          base64Photos.push(reader.result.toString());
          this.task.photos = base64Photos; // update photos while reading
        }
      };
      reader.readAsDataURL(file);
    });
  }

  submitTask() {
    this.activityService.addTask({ ...this.task });
    alert('Task submitted successfully!');
    if (this.dialogRef) {
      this.dialogRef.close();  // close dialog only if inside a dialog
    }
    // reset task after submit
    this.task = {
      field: '',
      taskType: '',
      workerName: '',
      duration: 0,
      remarks: '',
      date: new Date().toISOString().split('T')[0],
      photos: [],
    };
  }
}
