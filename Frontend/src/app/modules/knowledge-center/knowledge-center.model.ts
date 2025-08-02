export interface Article {
  id?: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  attachments: File[];  
  createdAt?: Date;
}
