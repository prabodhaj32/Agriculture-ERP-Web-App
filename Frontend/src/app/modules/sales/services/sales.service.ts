import { Injectable } from '@angular/core';
import { Sale } from '../models/sale.model';
import { Buyer } from '../models/buyer.model';

@Injectable({ providedIn: 'root' })
export class SalesService {
  private sales: Sale[] = [];

  private buyers: Buyer[] = [
   
  ];

  private buyerIdCounter = this.buyers.length + 1;

  getBuyers(): Buyer[] {
    // return a copy to prevent external mutation
    return [...this.buyers];
  }

  addSale(sale: Sale) {
    this.sales.push({ ...sale, id: Date.now() }); // for sales, Date.now() can be okay
  }

  getSales(): Sale[] {
    return [...this.sales]; // return a copy for safety
  }

  addBuyer(buyer: Buyer) {
    buyer.id = this.buyerIdCounter++;
    this.buyers.push(buyer);
  }

  updateBuyer(updated: Buyer) {
    const index = this.buyers.findIndex(b => b.id === updated.id);
    if (index !== -1) this.buyers[index] = updated;
  }

  deleteBuyer(id: number) {
    this.buyers = this.buyers.filter(b => b.id !== id);
  }
}
