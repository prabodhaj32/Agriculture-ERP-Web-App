import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialService } from '../../services/financial.service';

@Component({
  selector: 'app-cost-comparison',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cost-comparison.component.html',
  styleUrls: ['./cost-comparison.component.css']
})
export class CostComparisonComponent {
  comparisonData: any = {};

  constructor(private financialService: FinancialService) {}

  ngOnInit() {
    this.loadComparisonData();
  }

  loadComparisonData() {
    this.comparisonData = this.financialService.getFieldWiseComparison();
  }

  exportComparisonToExcel() {
    // Convert comparisonData to an array of objects for Excel export
    const exportData = Object.entries(this.comparisonData).map(([field, total]) => ({
      Field: field,
      'Total Expense': total
    }));

    this.financialService.exportToExcel(exportData, 'field-wise-cost-comparison');
  }
}
