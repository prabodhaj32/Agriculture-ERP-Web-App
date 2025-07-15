import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialService } from '../../services/financial.service';

@Component({
  selector: 'app-income-expense-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './income-expense-chart.component.html',
  styleUrls: ['./income-expense-chart.component.css']
})
export class IncomeExpenseChartComponent {
  chartData: { income: Record<string, number>, expense: Record<string, number> } = {
    income: {},
    expense: {}
  };

  constructor(private financialService: FinancialService) {}

  ngOnInit() {
    this.chartData = this.financialService.getMonthlyChartData();
  }
}