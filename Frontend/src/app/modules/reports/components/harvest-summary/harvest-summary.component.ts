import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-harvest-summary',
   standalone: true,
   imports: [CommonModule, FormsModule],
  templateUrl: './harvest-summary.component.html',
})
export class HarvestSummaryComponent {
  @Input() data: any[] = [];
}
