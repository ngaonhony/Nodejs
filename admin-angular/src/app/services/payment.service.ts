import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/api/payments'; 
  constructor(private http: HttpClient) {}
  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/all`); 
  }

  deletePaymentById(paymentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${paymentId}`);
  }
}