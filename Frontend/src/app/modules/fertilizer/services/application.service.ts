import { Injectable } from '@angular/core';
import { ApplicationEntry } from '../models/application-entry.model';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private applications: ApplicationEntry[] = [];

  addEntry(entry: ApplicationEntry) {
    this.applications.push(entry);
  }

  getAll(): ApplicationEntry[] {
    return [...this.applications];
  }

  getByField(field: string): ApplicationEntry[] {
    const trimmed = field.trim().toLowerCase();
    return this.applications.filter(entry =>
      entry.field.toLowerCase().includes(trimmed)
    );
  }

  getNextApplication(field: string): string | null {
    const filtered = this.applications
      .filter(entry => entry.field.toLowerCase() === field.trim().toLowerCase())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return filtered.length ? filtered[0].date : null;
  }
}
