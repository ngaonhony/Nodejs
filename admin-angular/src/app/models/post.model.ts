export interface Post {
  _id?: string;
  userId: string;
  title: string;
  description: string;
  price: number;
  location: string;
  area: number;
  images?: string[];
  paymentId: string;
  categoryId: string;
  serviceId: string;
  expiredAt?: Date;
  status: 'active' | 'inactive' | 'deleted'; 
}
