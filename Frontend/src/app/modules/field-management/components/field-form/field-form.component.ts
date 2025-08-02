import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
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

  fields: Field[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();

    if (this.field) {
      this.isEditMode = true;
      this.fieldForm.patchValue(this.field);
    }

    // this.loadFieldsFromLocalStorage();
  }

  initializeForm() {
    this.fieldForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      size: [0, [Validators.required, Validators.min(0.1)]],
      location: ['', Validators.required],
      soilType: ['', Validators.required],
      cropType: ['', Validators.required],
      status: ['', Validators.required],
      lat: [7.8731, Validators.required],
      lng: [80.7718, Validators.required],
      areaGeoJson: [null],
    });
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
      location: `Lat: ${event.lat.toFixed(5)}, Lng: ${event.lng.toFixed(5)}`
    });
    this.closeMap();
  }

  onShapeDrawn(geojson: any) {
    this.fieldForm.patchValue({ areaGeoJson: geojson });
    const areaSize = this.calculateArea(geojson);
    this.fieldForm.patchValue({ size: areaSize });
  }

  calculateArea(geojson: any): number {
    if (!geojson || geojson.geometry?.type !== 'Polygon') return 0;
   
    return 1; 
  }

  onSubmit() {
    if (this.fieldForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const fieldData = this.fieldForm.value as Field;
    this.fields.push(fieldData);
    this.formSubmit.emit(fieldData);

    this.downloadFieldAsJson(fieldData);
    // this.saveFieldsToLocalStorage();

    if (!this.isEditMode) {
      this.fieldForm.reset({
        lat: 7.8731,
        lng: 80.7718,
        size: 0,
        areaGeoJson: null,
      });
    }
  }

  onCancel() {
    this.formClose.emit();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);

        const requiredKeys = [
          'name', 'size', 'location', 'soilType',
          'cropType', 'status', 'lat', 'lng', 'areaGeoJson'
        ];

        const isValid = requiredKeys.every((key) => key in json);
        if (!isValid) {
          alert('Invalid JSON structure');
          return;
        }

        this.fieldForm.patchValue(json);
        this.isEditMode = true;
      } catch (err) {
        alert('Error parsing JSON file.');
      }
    };

    reader.readAsText(file);
  }

  downloadFieldAsJson(field: Field) {
    const jsonData = JSON.stringify(field, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${field.name || 'field'}-data.json`;
    a.click();

    URL.revokeObjectURL(url);
  }

  // saveFieldsToLocalStorage() {
  //   localStorage.setItem('allFields', JSON.stringify(this.fields));
  // }

  // loadFieldsFromLocalStorage() {
  //   const data = localStorage.getItem('allFields');
  //   if (data) {
  //     try {
  //       this.fields = JSON.parse(data) as Field[];
  //     } catch {
  //       console.warn('Failed to parse saved fields from localStorage');
  //     }
  //  }
  // }
}