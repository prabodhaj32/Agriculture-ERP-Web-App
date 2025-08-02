import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportsService {
  getHarvestSummary(filters: any): Observable<any[]> {
    return of([]);
  }

  getProductivityCost(filters: any): Observable<any[]> {
    return of([]);
  }
}
