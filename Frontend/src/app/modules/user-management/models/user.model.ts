export interface User {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  password?: string; 
  assignedFields: string[];
  isActive?: boolean;
}