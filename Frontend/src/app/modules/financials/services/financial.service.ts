import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

export interface Expense {
  type: string;
  date: string;
  field: string;
  amount: number;
  description?: string; // make optional, some entries might not have it
}

export interface Revenue {
  type: string;
  date: string;
  field: string;
  total: number;
  description?: string; // optional
}

@Injectable({ providedIn: 'root' })
export class FinancialService {
  private expenses: Expense[] = [];
  private revenues: Revenue[] = [];

  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  expenses$ = this.expensesSubject.asObservable();

  private revenuesSubject = new BehaviorSubject<Revenue[]>([]);
  revenues$ = this.revenuesSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  // Load saved data from localStorage on service init
  private loadFromStorage(): void {
    const expenses = localStorage.getItem('financial_expenses');
    const revenues = localStorage.getItem('financial_revenues');

    if (expenses) {
      this.expenses = JSON.parse(expenses);
      this.expensesSubject.next([...this.expenses]);
    }

    if (revenues) {
      this.revenues = JSON.parse(revenues);
      this.revenuesSubject.next([...this.revenues]);
    }
  }

  // Save current data to localStorage
  private saveToStorage(): void {
    localStorage.setItem('financial_expenses', JSON.stringify(this.expenses));
    localStorage.setItem('financial_revenues', JSON.stringify(this.revenues));
  }

  addExpense(expense: Expense): void {
    this.expenses.push({ ...expense });
    this.expensesSubject.next([...this.expenses]);
    this.saveToStorage();
  }

  addRevenue(revenue: Revenue): void {
    this.revenues.push({ ...revenue });
    this.revenuesSubject.next([...this.revenues]);
    this.saveToStorage();
  }

  getExpenses(): Expense[] {
    return [...this.expenses];
  }

  getRevenues(): Revenue[] {
    return [...this.revenues];
  }

  // Clear all expenses and revenues
  clearAll(): void {
    this.expenses = [];
    this.revenues = [];
    this.expensesSubject.next([]);
    this.revenuesSubject.next([]);
    localStorage.removeItem('financial_expenses');
    localStorage.removeItem('financial_revenues');
  }

  getFieldWiseComparison(expenses?: Expense[]): { [field: string]: number } {
    const targetExpenses = expenses ?? this.expenses;
    return targetExpenses.reduce((acc, e) => {
      acc[e.field] = (acc[e.field] || 0) + e.amount;
      return acc;
    }, {} as { [field: string]: number });
  }

  getMonthlyChartData(
    revenues?: Revenue[],
    expenses?: Expense[]
  ): { income: { [month: string]: number }; expense: { [month: string]: number } } {
    const incomeData = revenues ?? this.revenues;
    const expenseData = expenses ?? this.expenses;

    const income: { [month: string]: number } = {};
    const expense: { [month: string]: number } = {};

    incomeData.forEach(r => {
      const month = r.date?.slice(0, 7);
      if (month) income[month] = (income[month] || 0) + r.total;
    });

    expenseData.forEach(e => {
      const month = e.date?.slice(0, 7);
      if (month) expense[month] = (expense[month] || 0) + e.amount;
    });

    return { income, expense };
  }

  exportToExcel(data: any[], filename: string): void {
    if (!data || data.length === 0) {
      console.warn('No data to export.');
      return;
    }

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
