import { Component, OnInit } from '@angular/core';
import { ApplicationEntry } from '../../models/application-entry.model';
import { ApplicationService } from '../../services/application.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationFormDialogComponent } from '../application-form-dialog/application-form-dialog.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule],
  templateUrl: './application-form.component.html',
})
export class ApplicationFormComponent implements OnInit {
  displayedColumns: string[] = ['date', 'item', 'quantityApplied', 'appliedBy'];
  applications: ApplicationEntry[] = [];
  fieldFilter: string = '';

  constructor(private applicationService: ApplicationService, private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.applicationService.getAll().length === 0) {
      this.applicationService.addEntry({
        id: 1,
        field: 'Field A',
        date: '2025-07-01',
        item: 'Urea',
        quantityApplied: 20,
        appliedBy: 'John',
      });

      this.applicationService.addEntry({
        id: 2,
        field: 'Field B',
        date: '2025-07-05',
        item: 'Compost',
        quantityApplied: 50,
        appliedBy: 'Mary',
      });
    }

    this.refresh();
  }

  openApplicationDialog() {
    const dialogRef = this.dialog.open(ApplicationFormDialogComponent, {
      width: '500px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newEntry: ApplicationEntry = {
          ...result,
          id: Date.now(),
          date: new Date(result.date).toISOString().split('T')[0],
        };
        this.applicationService.addEntry(newEntry);
        this.refresh();
      }
    });
  }

  refresh() {
    this.applications = this.applicationService.getAll();
  }

  getHistoryByField(): ApplicationEntry[] {
    return this.applicationService.getByField(this.fieldFilter);
  }

  getNextApplicationDate(): string | null {
    return this.applicationService.getNextApplication(this.fieldFilter);
  }

  getFieldList(): string[] {
    const fields = this.applicationService.getAll().map((e) => e.field.trim());
    return [...new Set(fields)];
  }

  getNextScheduledDate(): string | null {
    const lastDate = this.getNextApplicationDate();
    if (!lastDate) return null;
    const nextDate = new Date(lastDate);
    nextDate.setDate(nextDate.getDate() + 14);
    return nextDate.toISOString().split('T')[0];
  }

  isApplicationOverdue(): boolean {
    const nextDateStr = this.getNextScheduledDate();
    if (!nextDateStr) return false;
    const today = new Date().toISOString().split('T')[0];
    return today > nextDateStr;
  }
}
