
export interface Post {
    _id?: string; 
    userId: string; 
    title: string; 
    description: string; 
    price: number; 
    location: string; 
    area: string; 
    images?: string[]; 
    categoryId: string; 
    serviceBookingId: string; 
    createdAt?: Date;
    updatedAt?: Date; 
  }