export interface Category {
  _id?: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive';
  createdAt?: Date; 
  updatedAt?: Date; 
}
