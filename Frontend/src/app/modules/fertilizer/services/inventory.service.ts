import { Injectable } from '@angular/core';
import { InventoryItem } from '../models/inventory-item.model';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private items: InventoryItem[] = [];

  addItem(item: InventoryItem) {
    this.items.push(item);
  }

  getAll(): InventoryItem[] {
    return this.items;
  }

  getLowStockItems(threshold: number = 10): InventoryItem[] {
    return this.items.filter(item => item.quantity < threshold);
  }
}
