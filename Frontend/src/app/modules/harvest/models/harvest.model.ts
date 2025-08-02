export interface HarvestEntry {
  id?: string;
  field: string;
  date: string;
  workerName: string;
  quantity: number;
  qualityGrade: string;
  transportDetails: string;
  plannedYield?: number; 
}
