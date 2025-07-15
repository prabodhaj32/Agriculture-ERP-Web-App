import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventory-item.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory-form',
  standalone: true,
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css'],
  imports: [CommonModule, FormsModule],
})
export class InventoryFormComponent implements OnInit {
  item: Partial<InventoryItem> = {};
  inventory: InventoryItem[] = [];
  lowStockItems: InventoryItem[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.refresh();
  }

  addItem() {
    const newItem: InventoryItem = {
      ...this.item,
      id: Date.now(),
      name: this.item.name || '',
      type: this.item.type || '',
      brand: this.item.brand || '',
      quantity: this.item.quantity || 0,
      unitCost: this.item.unitCost || 0,
    };
    this.inventoryService.addItem(newItem);
    this.item = {};
    this.refresh();
  }

  refresh() {
    this.inventory = this.inventoryService.getAll();
    this.lowStockItems = this.inventoryService.getLowStockItems();
  }
}
