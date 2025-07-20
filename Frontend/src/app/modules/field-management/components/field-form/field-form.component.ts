import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Field } from '../../models/field.model';

@Component({
  selector: 'app-field-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './field-form.component.html',
})
export class FieldFormComponent {
  @Input() set field(value: Field | null) {
    this.localField = value ? { ...value } : this.getEmptyField();
  }
  @Output() save = new EventEmitter<Field>();
  @Output() cancel = new EventEmitter<void>();

  localField: Field = this.getEmptyField();

  onSubmit() {
    this.save.emit(this.localField);
  }

  private getEmptyField(): Field {
    return {
      id: 0,
      name: '',
      size: '',
      location: '',
      soilType: '',
      cropType: '',
      status: '',
    };
  }
}
