export interface Sale {
  id: number;
  buyer: string;
  item: string;
  quantity: number;
  unitPrice: number;
  total: number;
  amountPaid: number;
  dueAmount: number;
  deliveryDate: string;
}
