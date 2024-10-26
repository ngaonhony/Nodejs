export interface User {
  _id?:string;
  name: string;
  password: string;
  email: string;
  phone?: string;
  address: string;
  balance: number;
  role: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}