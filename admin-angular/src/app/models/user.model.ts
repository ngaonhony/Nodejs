export interface User {
  _id?:string;
  name: string;
  password: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}