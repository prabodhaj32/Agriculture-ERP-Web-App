import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-productivity-cost',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatCardModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './productivity-cost.component.html',
})
export class ProductivityCostComponent {
  fieldsList: string[] = ['Field A', 'Field B', 'Field C'];

  filters = {
    field: '',
    minCost: 0,
  };

  fullData = [
    { field: 'Field A', cost: 5000, productivity: 120 },
    { field: 'Field B', cost: 3000, productivity: 95 },
    { field: 'Field C', cost: 8000, productivity: 150 },
  ];

  filteredData = [...this.fullData];

  applyFilters() {
    this.filteredData = this.fullData.filter((item) => {
      const matchField = item.field.toLowerCase().includes(this.filters.field.toLowerCase());
      const matchCost = item.cost >= this.filters.minCost;
      return matchField && matchCost;
    });
  }

  clearFilters() {
    this.filters = { field: '', minCost: 0 };
    this.applyFilters();
  }

  getSummaryData() {
    return this.filteredData.map((item) => ({
      metric: item.field,
      value: `Cost: Rs ${item.cost}, Productivity: ${item.productivity} kg`,
    }));
  }

  exportToPDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Productivity & Cost Report', 14, 10);

    const summaryData = this.getSummaryData();

    autoTable(doc, {
      startY: 20,
      head: [['Field', 'Details']],
      body: summaryData.map((d) => [d.metric, d.value]),
    });

    doc.save('productivity-cost-report.pdf');
  }

  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.getSummaryData());
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Productivity Cost');
    XLSX.writeFile(workbook, 'productivity-cost-report.xlsx');
  }

  printReport() {
    const printContent = document.getElementById('print-section')?.innerHTML;
    if (printContent) {
      const win = window.open('', '', 'width=800,height=600');
      if (win) {
        win.document.write(`
          <html>
            <head>
              <title>Productivity & Cost Report</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { padding: 8px; border: 1px solid #000; }
              </style>
            </head>
            <body>
              ${printContent}
              <script>
                window.onload = function() {
                  window.print();
                  window.onafterprint = function () { window.close(); };
                };
              </script>
            </body>
          </html>
        `);
        win.document.close();
      }
    }
  }

  getData(): { metric: string; value: string }[] {
    return this.getSummaryData();
  }
}
