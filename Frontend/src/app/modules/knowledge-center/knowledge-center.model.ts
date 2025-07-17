export interface Article {
  id?: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  attachments: File[];  // store files in component only; send FormData to backend
  createdAt?: Date;
}
