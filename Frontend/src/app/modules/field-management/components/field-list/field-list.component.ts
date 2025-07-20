import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Field } from '../../models/field.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-field-list',
  standalone: true,
  imports: [CommonModule,MatTableModule,
    MatButtonModule,MatIconModule],
  templateUrl: './field-list.component.html',
   styleUrls: ['./field-list.component.css'],
})
export class FieldListComponent {
  @Input() fields: Field[] = [];
  @Output() edit = new EventEmitter<Field>();
  @Output() viewMap = new EventEmitter<Field>();

  displayedColumns: string[] = ['name', 'location', 'size', 'soilType', 'cropType', 'status', 'map', 'actions'];

  onEdit(field: Field) {
    this.edit.emit(field);
  }

  onViewMap(field: Field) {
    this.viewMap.emit(field);
  }
}
