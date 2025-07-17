import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.component.html',
})
export class ReportsComponent {
  filters = {
    dateFrom: '',
    dateTo: '',
    field: '',
    worker: '',
    cropType: '',
    costType: ''
  };

  harvestData = [
    { date: '2025-07-15', field: 'A', worker: 'John', crop: 'Tea', costType: 'Labor', quantity: 100 },
    { date: '2025-07-16', field: 'B', worker: 'Sara', crop: 'Rubber', costType: 'Transport', quantity: 80 },
    { date: '2025-07-17', field: 'C', worker: 'Ali', crop: 'Tea', costType: 'Fertilizer', quantity: 120 },
  ];

  filteredData = [...this.harvestData];

  onFiltersChange() {
    this.filteredData = this.harvestData.filter(item => {
      return (!this.filters.dateFrom || item.date >= this.filters.dateFrom) &&
             (!this.filters.dateTo || item.date <= this.filters.dateTo) &&
             (!this.filters.field || item.field.includes(this.filters.field)) &&
             (!this.filters.worker || item.worker.includes(this.filters.worker)) &&
             (!this.filters.cropType || item.crop.includes(this.filters.cropType)) &&
             (!this.filters.costType || item.costType.includes(this.filters.costType));
    });
  }

  exportToPDF() {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Date', 'Field', 'Worker', 'Crop', 'Cost Type', 'Quantity']],
      body: this.filteredData.map(item => [
        item.date,
        item.field,
        item.worker,
        item.crop,
        item.costType,
        item.quantity,
      ]),
    });
    doc.save('report.pdf');
  }

  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, 'report.xlsx');
  }

  printReport() {
    window.print();
  }
}
