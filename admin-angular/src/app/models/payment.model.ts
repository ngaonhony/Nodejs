export interface Payment {
  orderId: string;      
  amount: number;       
  paymentMethod?: string; 
  paymentId: string;   
  status?: string;   
  createdAt?: Date;   
  updatedAt?: Date; 
}
