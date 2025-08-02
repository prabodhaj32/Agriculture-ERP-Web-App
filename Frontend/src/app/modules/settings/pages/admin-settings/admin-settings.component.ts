import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CropTypeFormComponent } from '../../components/crop-type-form/crop-type-form.component';
import { TaskTypeFormComponent } from '../../components/task-type-form/task-type-form.component';
import { FertilizerTypeFormComponent } from '../../components/fertilizer-type-form/fertilizer-type-form.component';
import { FieldUnitFormComponent } from '../../components/field-unit-form/field-unit-form.component';
import { CostTypeFormComponent } from '../../components/cost-type-form/cost-type-form.component';
import { BackupRestoreComponent } from '../../components/backup-restore/backup-restore.component';
import { WeatherApiSettingsComponent } from '../../components/weather-api-settings/weather-api-settings.component';
import { SystemLogsComponent } from '../../components/system-logs/system-logs.component';

@Component({
  selector: 'app-admin-settings',
  imports: [CommonModule,FormsModule,CropTypeFormComponent,TaskTypeFormComponent,
    FertilizerTypeFormComponent,FieldUnitFormComponent,CostTypeFormComponent,BackupRestoreComponent,
    WeatherApiSettingsComponent,SystemLogsComponent
  ],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.css'
})
export class AdminSettingsComponent {

}
