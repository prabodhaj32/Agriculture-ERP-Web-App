import { Component, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductivityCostComponent } from './components/productivity-cost/productivity-cost.component';
import { MatTableModule } from '@angular/material/table';
import { HarvestSummaryComponent } from './components/harvest-summary/harvest-summary.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductivityCostComponent, MatTableModule, HarvestSummaryComponent],
  templateUrl: './reports.component.html',
})
export class ReportsComponent {
  @ViewChild(ProductivityCostComponent)
  productivityComponent!: ProductivityCostComponent;

  filters = {
    dateFrom: '',
    dateTo: '',
    field: '',
    worker: '',
    cropType: '',
    costType: '',
  };

  harvestData = [
    { date: '2025-07-15', field: 'A', worker: 'John', crop: 'Tea', costType: 'Labor', quantity: 100 },
    { date: '2025-07-16', field: 'B', worker: 'Sara', crop: 'Rubber', costType: 'Transport', quantity: 80 },
    { date: '2025-07-17', field: 'C', worker: 'Ali', crop: 'Tea', costType: 'Fertilizer', quantity: 120 },
  ];
  displayedColumns: string[] = ['date', 'field', 'worker', 'crop', 'costType', 'quantity'];

  filteredData = [...this.harvestData];

  onFiltersChange() {
    this.filteredData = this.harvestData.filter((item) => {
      return (
        (!this.filters.dateFrom || item.date >= this.filters.dateFrom) &&
        (!this.filters.dateTo || item.date <= this.filters.dateTo) &&
        (!this.filters.field || item.field.includes(this.filters.field)) &&
        (!this.filters.worker || item.worker.includes(this.filters.worker)) &&
        (!this.filters.cropType || item.crop.includes(this.filters.cropType)) &&
        (!this.filters.costType || item.costType.includes(this.filters.costType))
      );
    });
  }

  exportToPDF() {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Harvest Summary Report', 14, 20);

    autoTable(doc, {
      startY: 25,
      head: [['Date', 'Field', 'Worker', 'Crop', 'Cost Type', 'Quantity']],
      body: this.filteredData.map((item) => [
        item.date,
        item.field,
        item.worker,
        item.crop,
        item.costType,
        item.quantity,
      ]),
    });

    const productivityData = this.productivityComponent?.getData() || [];

    if (productivityData.length) {
      doc.addPage();
      doc.setFontSize(16);
      doc.text('Productivity & Cost Report', 14, 20);

      autoTable(doc, {
        startY: 25,
        head: [['Metric', 'Value']],
        body: productivityData.map((row: { metric: string; value: string }) => [row.metric, row.value]),
      });
    }

    doc.save('combined-report.pdf');
  }

  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Harvest Report');
    XLSX.writeFile(workbook, 'harvest-report.xlsx');
  }

  printReport() {
    window.print();
  }
}
