import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Buyer } from '../models/buyer.model';
import { Sale } from '../models/sale.model';

@Injectable({ providedIn: 'root' })
export class SalesService {
  // Initial buyers data
  private initialBuyers: Buyer[] = [
    { id: 1, name: 'Global Tea Co.', email: 'global@tea.com', phone: '0112345678' },
    { id: 2, name: 'Lanka Beverages', email: 'info@lankabv.com', phone: '0771234567' }
  ];

  // Reactive state for buyers and sales
  private buyersSubject = new BehaviorSubject<Buyer[]>(this.initialBuyers);
  private salesSubject = new BehaviorSubject<Sale[]>([]);

  // Public observables
  buyers$ = this.buyersSubject.asObservable();
  sales$ = this.salesSubject.asObservable();

  // === Buyer Methods ===

  getBuyers(): Buyer[] {
    return this.buyersSubject.value;
  }

  addBuyer(buyer: Buyer): void {
    const newBuyer: Buyer = { ...buyer, id: this.generateId() };
    const updatedBuyers = [...this.buyersSubject.value, newBuyer];
    this.buyersSubject.next(updatedBuyers);
  }

  updateBuyer(updatedBuyer: Buyer): void {
    const updatedBuyers = this.buyersSubject.value.map(buyer =>
      buyer.id === updatedBuyer.id ? { ...updatedBuyer } : buyer
    );
    this.buyersSubject.next(updatedBuyers);
  }

  deleteBuyer(id: number): void {
    const filteredBuyers = this.buyersSubject.value.filter(buyer => buyer.id !== id);
    this.buyersSubject.next(filteredBuyers);
  }

  // === Sale Methods ===

  getSales(): Sale[] {
    return this.salesSubject.value;
  }

  addSale(sale: Sale): void {
    const updatedSales = [...this.salesSubject.value, sale];
    this.salesSubject.next(updatedSales);
  }

  // === Utility ===

  private generateId(): number {
    return Date.now() + Math.floor(Math.random() * 1000); // slightly more unique
  }
}
