import { Component, OnInit } from '@angular/core';
import { HarvestService } from '../../services/harvest.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-harvest-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './harvest-summary.component.html',
  styleUrls: ['./harvest-summary.component.css']
})
export class HarvestSummaryComponent implements OnInit {
  summary: { [field: string]: number } = {};

  constructor(private harvestService: HarvestService) {}

  ngOnInit() {
    this.summary = this.harvestService.getSummaryByField() || {};
  }

  get isEmptySummary(): boolean {
    return Object.keys(this.summary).length === 0;
  }

  exportLog() {
    const csvRows = [['Field', 'Total Quantity']];
    for (const key in this.summary) {
      csvRows.push([key, this.summary[key].toString()]);
    }

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
}

