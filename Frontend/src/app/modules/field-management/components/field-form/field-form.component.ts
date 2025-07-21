import { Component, EventEmitter, OnInit, Output,Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Field } from '../../models/field.model';

@Component({
  selector: 'app-field-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './field-form.component.html',
  styleUrls: ['./field-form.component.css'],
})
export class FieldFormComponent implements OnInit {
  @Input() field?: Field;
   @Input() fieldId?: number;
  @Output() formSubmit = new EventEmitter<Field>();
  @Output() formClose = new EventEmitter<void>();

  fieldForm!: FormGroup;
  isEditMode = false;

  statuses = ['Planted', 'Harvested', 'Idle', 'Maintenance'];
  soilTypes = ['Loamy', 'Sandy', 'Clay', 'Silty'];
  cropTypes = ['Tea', 'Vegetables', 'Fruits', 'Herbs'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  this.fieldForm = this.fb.group({
    id: [null], // include id for updates
    name: ['', Validators.required],
    size: [null, [Validators.required, Validators.min(0.1)]],
    location: ['', Validators.required],
    soilType: ['', Validators.required],
    cropType: ['', Validators.required],
    status: ['', Validators.required],
    lat: [null],
    lng: [null],
  });

  if (this.field) {
    this.isEditMode = true;
    this.fieldForm.patchValue(this.field);  // 💡 Patch form with existing field data
  }
}

  onSubmit() {
    if (this.fieldForm.invalid) return;
    this.formSubmit.emit(this.fieldForm.value as Field);
  }

  onCancel() {
    this.formClose.emit();
  }
}
