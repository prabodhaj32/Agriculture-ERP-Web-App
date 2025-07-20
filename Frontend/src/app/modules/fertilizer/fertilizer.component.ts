import { Component } from '@angular/core';
import { ApplicationFormComponent } from './components/application-form/application-form.component';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';

@Component({
  selector: 'app-fertilizer',
  standalone: true,
  imports: [ApplicationFormComponent, InventoryFormComponent],
  templateUrl: './fertilizer.component.html',
  styleUrls: ['./fertilizer.component.css'],
})
export class FertilizerComponent {}
