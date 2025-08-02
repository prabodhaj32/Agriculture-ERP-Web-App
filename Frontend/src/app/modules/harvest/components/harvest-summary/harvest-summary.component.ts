import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { HarvestService } from '../../services/harvest.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HarvestEntry } from '../../models/harvest.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HarvestFormComponent } from '../harvest-form/harvest-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-harvest-summary',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatTableModule],
  templateUrl: './harvest-summary.component.html',
  styleUrls: ['./harvest-summary.component.css'],
})
export class HarvestSummaryComponent implements OnInit, OnDestroy {
  tableData = new MatTableDataSource<{ field: string; quantity: number }>();
  displayedColumns: string[] = ['field', 'quantity'];
  private subscription!: Subscription;
  private dialog = inject(MatDialog);

  constructor(private harvestService: HarvestService) {}

  ngOnInit() {
    this.subscription = this.harvestService.harvests$.subscribe(
      (entries: HarvestEntry[]) => {
        const summaryMap: { [field: string]: number } = {};

        for (const entry of entries) {
          summaryMap[entry.field] = (summaryMap[entry.field] || 0) + entry.quantity;
        }

        // Convert summary map to array for table
        const summaryArray = Object.entries(summaryMap).map(([field, quantity]) => ({
          field,
          quantity
        }));

        this.tableData.data = summaryArray;
      }
    );
  }

  openHarvestForm() {
    this.dialog.open(HarvestFormComponent, {
      width: '600px'
    });
  }

  exportLog() {
    const csvRows = [['Field', 'Total Quantity'], ...this.tableData.data.map(row => [row.field, row.quantity.toString()])];
    const csvContent = csvRows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'harvest-summary.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get isEmptySummary(): boolean {
    return this.tableData.data.length === 0;
  }
  
}
