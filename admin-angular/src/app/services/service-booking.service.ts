import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ServiceBooking } from '../models/serviceBooking.model'; // Đảm bảo bạn có model ServiceBooking

@Injectable({
  providedIn: 'root',
})
export class ServiceBookingService {
  private apiUrl = 'http://localhost:3000/api/service-bookings'; // Đường dẫn đến API của bạn

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User may not be authenticated.');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  // Lấy danh sách dịch vụ đặt chỗ
  getServiceBookings(): Observable<ServiceBooking[]> {
    return this.http.get<ServiceBooking[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  updateServiceBooking(serviceBooking: ServiceBooking): Observable<ServiceBooking> {
    return this.http.put<ServiceBooking>(`${this.apiUrl}/${serviceBooking._id}`, serviceBooking, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error updating service booking:', error);
          return throwError(error);
        })
      );
  }

  // Xóa dịch vụ đặt chỗ
  deleteServiceBooking(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}