import { Injectable } from '@angular/core';
import { HarvestEntry } from '../models/harvest.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HarvestService {
  private harvests: HarvestEntry[] = [];

  private harvestsSubject = new BehaviorSubject<HarvestEntry[]>([]);
  public harvests$ = this.harvestsSubject.asObservable(); // Observable for components to subscribe to

  private plannedYields: { [field: string]: number } = {
    'Field A': 100,
    'Field B': 150,
    'Field C': 120
  };

  addHarvest(entry: HarvestEntry) {
    this.harvests.push(entry);
    this.harvestsSubject.next([...this.harvests]); // emit new value
  }

  getAll(): HarvestEntry[] {
    return this.harvests;
  }

  getSummaryByField(): { [key: string]: number } {
    const summary: { [key: string]: number } = {};
    for (const entry of this.harvests) {
      summary[entry.field] = (summary[entry.field] || 0) + entry.quantity;
    }
    return summary;
  }

  getPlannedVsActual(): {
    field: string;
    plannedYield: number | null;
    quantity: number;
  }[] {
    const summary = this.getSummaryByField();
    const fields = new Set<string>([
      ...Object.keys(this.plannedYields),
      ...Object.keys(summary)
    ]);

    return Array.from(fields).map(field => ({
      field,
      plannedYield: this.plannedYields[field] ?? null,
      quantity: summary[field] ?? 0
    }));
  }

  exportToCSV() {
    const csvContent =
      'data:text/csv;charset=utf-8,Field,Date,Worker,Quantity,Grade,Transport\n' +
      this.harvests
        .map(
          e =>
            `${e.field},${e.date},${e.workerName},${e.quantity},${e.qualityGrade},${e.transportDetails}`
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'harvest_log.csv');
    document.body.appendChild(link);
    link.click();
  }
}
