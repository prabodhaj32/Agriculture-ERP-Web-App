// field-form.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapComponent } from '../../map/map.component';
import { Field } from '../../models/field.model';

@Component({
  selector: 'app-field-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MapComponent],
  templateUrl: './field-form.component.html',
  styleUrls: ['./field-form.component.css'],
})
export class FieldFormComponent implements OnInit {
  @Input() field?: Field;
  @Output() formSubmit = new EventEmitter<Field>();
  @Output() formClose = new EventEmitter<void>();

  fieldForm!: FormGroup;
  isEditMode = false;
  showMap = true;

  statuses = ['Planted', 'Harvested', 'Idle', 'Maintenance'];
  soilTypes = ['Loamy', 'Sandy', 'Clay', 'Silty'];
  cropTypes = ['Tea', 'Vegetables', 'Fruits', 'Herbs'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fieldForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      size: [null, [Validators.required, Validators.min(0.1)]],
      location: ['', Validators.required],
      soilType: ['', Validators.required],
      cropType: ['', Validators.required],
      status: ['', Validators.required],
      lat: [null, Validators.required],
      lng: [null, Validators.required],
    });

    if (this.field) {
      this.isEditMode = true;
      this.fieldForm.patchValue(this.field);
    }
  }

 

openMap() {
  this.showMap = true;
}

closeMap() {
  this.showMap = true;
}

onLocationSelected(event: { lat: number; lng: number }) {
  this.fieldForm.patchValue({
    lat: event.lat,
    lng: event.lng,
    location: `Lat: ${event.lat.toFixed(5)}, Lng: ${event.lng.toFixed(5)}`,
  });
  this.closeMap();  // hide map after selection
}

onSubmit() {
  if (this.fieldForm.invalid) {
    alert('Please fill in all required fields.');
    return;
  }
    const fieldData = this.fieldForm.value as Field;
    this.formSubmit.emit(fieldData);

    // Reset form if not editing
    if (!this.isEditMode) {
      this.fieldForm.reset();
    }
  }

  onCancel() {
    this.formClose.emit();
  }
}
