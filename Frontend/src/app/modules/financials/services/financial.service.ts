import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

export interface Expense {
  type: string;
  date: string;
  field: string;
  amount: number;
  description: string;
}

export interface Revenue {
  type: string;
  date: string;
  field: string;
  total: number;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class FinancialService {
  private expenses: Expense[] = [];
  private revenues: Revenue[] = [];

  // Add new expense entry
  addExpense(expense: Expense): void {
    this.expenses.push({ ...expense });
  }

  // Add new revenue entry
  addRevenue(revenue: Revenue): void {
    this.revenues.push({ ...revenue });
  }

  // Return all expenses
  getExpenses(): Expense[] {
    return [...this.expenses];
  }

  // Return all revenues
  getRevenues(): Revenue[] {
    return [...this.revenues];
  }

  // Field-wise total expense calculation
  getFieldWiseComparison(): { [field: string]: number } {
    const result: { [field: string]: number } = {};
    this.expenses.forEach(e => {
      result[e.field] = (result[e.field] || 0) + e.amount;
    });
    return result;
  }

  // Monthly chart data (yyyy-mm grouped)
  getMonthlyChartData(): { income: { [month: string]: number }, expense: { [month: string]: number } } {
    const income: { [month: string]: number } = {};
    const expense: { [month: string]: number } = {};

    this.revenues.forEach(r => {
      const month = r.date?.slice(0, 7); // yyyy-mm
      if (month) income[month] = (income[month] || 0) + r.total;
    });

    this.expenses.forEach(e => {
      const month = e.date?.slice(0, 7);
      if (month) expense[month] = (expense[month] || 0) + e.amount;
    });

    return { income, expense };
  }

  // Export any dataset to Excel
  exportToExcel(data: any[], filename: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { Data: worksheet },
      SheetNames: ['Data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const file: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    FileSaver.saveAs(file, `${filename}.xlsx`);
  }
}
