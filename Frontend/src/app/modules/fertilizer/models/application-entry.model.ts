export interface ApplicationEntry {
  id: number;
  field: string;
  date: string; // ISO format: '2025-07-01'
  item: string;
  quantityApplied: number;
  appliedBy: string;
}
