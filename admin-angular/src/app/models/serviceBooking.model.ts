
export interface ServiceBooking {
    _id?: string; 
    userId: string; 
    serviceId: string; 
    bookingDate: Date; 
    bookingTime: number; 
    expiryDate: Date; 
  }