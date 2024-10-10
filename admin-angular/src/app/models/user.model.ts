export interface User {
  _id?:string;
  username: string;
  password: string;
  email: string;
  phone?: string;
  address: string;
  balance: number;
  role: 'tenant' | 'landlord' | 'admin';
}