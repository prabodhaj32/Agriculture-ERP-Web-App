import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReportFilters } from '../../models/report.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './filters.component.html',
})
export class FiltersComponent {
  @Input() filters!: ReportFilters;
  @Output() filtersChange = new EventEmitter<void>();

  onChange() {
    this.filtersChange.emit();
  }
}
