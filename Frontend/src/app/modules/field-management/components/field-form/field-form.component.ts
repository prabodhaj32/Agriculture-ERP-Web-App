import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Field } from '../../models/field.model';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio'; 

@Component({
  selector: 'app-field-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './field-form.component.html',
})
export class FieldFormComponent {
  @Input() field: Field = {
    id: 0,
    name: '',
    size: 0,
    location: '',
    soilType: '',
    cropType: '',
    status: 'Active',
  };

  @Output() save = new EventEmitter<Field>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit() {
    this.save.emit({ ...this.field });
  }
}
