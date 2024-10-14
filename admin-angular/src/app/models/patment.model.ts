
export interface Payment {
    _id?: string;
    userId: string;
    amount: number; 
    paymentMethod: 'credit_card' | 'debit_card' | 'paypal' | 'zalo_pay'; 
    status: 'pending' | 'completed' | 'failed'; 
    createdAt?: Date; 
  }