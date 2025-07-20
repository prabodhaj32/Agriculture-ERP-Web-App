import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Sale } from '../../models/sale.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sales-tracker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  templateUrl: './sales-tracker.component.html',
})
export class SalesTrackerComponent implements OnInit, OnDestroy, AfterViewInit {
  sales: Sale[] = [];
  private salesSub!: Subscription;

  displayedColumns: string[] = ['buyer', 'total', 'paid', 'due'];
  dataSource = new MatTableDataSource<SaleSummary>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private salesService: SalesService) {}

  ngOnInit() {
    this.salesSub = this.salesService.sales$.subscribe((sales) => {
      this.sales = sales;
      const summary = this.computeBuyerSummary(sales);
      this.dataSource.data = summary;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.salesSub.unsubscribe();
  }

  getTotalSales(): number {
    return this.sales.reduce((sum, s) => sum + s.total, 0);
  }

  getTotalPaid(): number {
    return this.sales.reduce((sum, s) => sum + s.amountPaid, 0);
  }

  getTotalDue(): number {
    return this.sales.reduce((sum, s) => sum + s.dueAmount, 0);
  }

  // Transform sales into buyer summary objects
  private computeBuyerSummary(sales: Sale[]): SaleSummary[] {
    const summaryMap: { [buyer: string]: SaleSummary } = {};

    for (const sale of sales) {
      if (!summaryMap[sale.buyer]) {
        summaryMap[sale.buyer] = { buyer: sale.buyer, total: 0, paid: 0, due: 0 };
      }
      summaryMap[sale.buyer].total += sale.total;
      summaryMap[sale.buyer].paid += sale.amountPaid;
      summaryMap[sale.buyer].due += sale.dueAmount;
    }

    return Object.values(summaryMap);
  }
}

interface SaleSummary {
  buyer: string;
  total: number;
  paid: number;
  due: number;
}
