import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HarvestService } from '../../services/harvest.service';
import { HarvestEntry } from '../../models/harvest.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-planned-vs-actual',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './planned-vs-actual.component.html',
  styleUrls: ['./planned-vs-actual.component.css']
})
export class PlannedVsActualComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['field', 'plannedYield', 'quantity', 'variance'];
  dataSource = new MatTableDataSource<
    { field: string; plannedYield: number | null; quantity: number; variance: number | string }
  >();
  private subscription!: Subscription;

  constructor(private harvestService: HarvestService) {}

  ngOnInit(): void {
    this.subscription = this.harvestService.harvests$.subscribe(() => {
      const records = this.harvestService.getPlannedVsActual().map(r => ({
        ...r,
        variance: r.plannedYield != null ? r.quantity - r.plannedYield : 'N/A'
      }));
      this.dataSource.data = records;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
