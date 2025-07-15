import { Component, OnInit } from '@angular/core';
import { HarvestService } from '../../services/harvest.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planned-vs-actual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planned-vs-actual.component.html',
  styleUrls: ['./planned-vs-actual.component.css']
})
export class PlannedVsActualComponent implements OnInit {
  records: {
    field: string;
    plannedYield: number | null;
    quantity: number;
  }[] = [];

  constructor(private harvestService: HarvestService) {}

  ngOnInit() {
    this.records = this.harvestService.getPlannedVsActual();
  }
}
