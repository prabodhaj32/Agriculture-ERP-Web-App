import { Component, OnInit } from '@angular/core';
import { ApplicationEntry } from '../../models/application-entry.model';
import { ApplicationService } from '../../services/application.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './application-form.component.html',
})
export class ApplicationFormComponent implements OnInit {
  entry: Partial<ApplicationEntry> = {};
  applications: ApplicationEntry[] = [];
  fieldFilter: string = '';

  constructor(private applicationService: ApplicationService) {}

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

  addEntry() {
    const newEntry: ApplicationEntry = {
      ...this.entry,
      id: Date.now(),
      date: new Date(this.entry.date || '').toISOString().split('T')[0],
      item: this.entry.item || '',
      quantityApplied: this.entry.quantityApplied || 0,
      field: this.entry.field || '',
      appliedBy: this.entry.appliedBy || '',
    };
    this.applicationService.addEntry(newEntry);
    this.entry = {};
    this.refresh();
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
    const fields = this.applicationService.getAll().map(e => e.field.trim());
    return [...new Set(fields)];
  }
  getNextScheduledDate(): string | null {
  const lastDate = this.getNextApplicationDate();
  if (!lastDate) return null;

  const nextDate = new Date(lastDate);
  nextDate.setDate(nextDate.getDate() + 14); // Add 14 days
  return nextDate.toISOString().split('T')[0];
}

isApplicationOverdue(): boolean {
  const nextDateStr = this.getNextScheduledDate();
  if (!nextDateStr) return false;

  const today = new Date().toISOString().split('T')[0];
  return today > nextDateStr;
}
}
