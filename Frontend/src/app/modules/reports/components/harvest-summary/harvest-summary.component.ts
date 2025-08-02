import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-harvest-summary',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule],
  templateUrl: './harvest-summary.component.html',
})
export class HarvestSummaryComponent implements OnInit {
  harvestData = [
    { date: '2025-07-15', field: 'A', worker: 'John', crop: 'Tea', costType: 'Labor', quantity: 100 },
    { date: '2025-07-16', field: 'B', worker: 'Sara', crop: 'Rubber', costType: 'Transport', quantity: 80 },
    { date: '2025-07-17', field: 'C', worker: 'Ali', crop: 'Tea', costType: 'Fertilizer', quantity: 120 },
  ];

  displayedColumns: string[] = ['date', 'field', 'worker', 'crop', 'costType', 'quantity'];
  filteredData: any[] = [];

  filters = {
    dateFrom: '',
    dateTo: '',
    field: '',
    worker: '',
    cropType: '',
    costType: ''
  };

  ngOnInit(): void {
    this.filteredData = [...this.harvestData];
  }

  onFiltersChange() {
    this.filteredData = this.harvestData.filter(item => {
      return (
        (!this.filters.dateFrom || item.date >= this.filters.dateFrom) &&
        (!this.filters.dateTo || item.date <= this.filters.dateTo) &&
        (!this.filters.field || item.field.toLowerCase().includes(this.filters.field.toLowerCase())) &&
        (!this.filters.worker || item.worker.toLowerCase().includes(this.filters.worker.toLowerCase())) &&
        (!this.filters.cropType || item.crop.toLowerCase().includes(this.filters.cropType.toLowerCase())) &&
        (!this.filters.costType || item.costType.toLowerCase().includes(this.filters.costType.toLowerCase()))
      );
    });
  }
}
