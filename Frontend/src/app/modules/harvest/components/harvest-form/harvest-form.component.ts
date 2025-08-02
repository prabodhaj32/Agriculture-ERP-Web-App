import { Component } from '@angular/core';
import { HarvestService } from '../../services/harvest.service';
import { HarvestEntry } from '../../models/harvest.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-harvest-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './harvest-form.component.html',
  styleUrls: ['./harvest-form.component.css'] 
})
export class HarvestFormComponent {
  entry: HarvestEntry = {
    field: '',
    date: '',
    workerName: '',
    quantity: 0,
    qualityGrade: '',
    transportDetails: ''
  };

  constructor(private harvestService: HarvestService) {}

  save() {
    this.harvestService.addHarvest({ ...this.entry });
    alert('Harvest Entry Saved!');
    this.entry = {
      field: '',
      date: '',
      workerName: '',
      quantity: 0,
      qualityGrade: '',
      transportDetails: ''
    };
  }

  

  
}
