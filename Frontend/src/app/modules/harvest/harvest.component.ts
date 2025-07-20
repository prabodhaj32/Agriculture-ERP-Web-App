import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HarvestFormComponent } from './components/harvest-form/harvest-form.component';
import { HarvestSummaryComponent } from './components/harvest-summary/harvest-summary.component';
import { PlannedVsActualComponent } from './components/planned-vs-actual/planned-vs-actual.component';

@Component({
  selector: 'app-harvest',
  standalone: true,
  imports: [CommonModule, HarvestFormComponent, HarvestSummaryComponent, PlannedVsActualComponent],
  templateUrl: './harvest.component.html',
  styleUrls: ['./harvest.component.css']
})
export class HarvestComponent {}
