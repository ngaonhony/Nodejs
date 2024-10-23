// src/app/service-booking/service-booking.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceBooking } from '../models/serviceBooking.model'; // Đảm bảo bạn có model ServiceBooking

@Injectable({
  providedIn: 'root',
})
export class ServiceBookingService {
  private apiUrl = 'http://localhost:3000/api/serviceBookings'; // Đường dẫn đến API của bạn

  constructor(private http: HttpClient) {}  

  // Lấy danh sách dịch vụ đặt chỗ
  getServiceBookings(): Observable<ServiceBooking[]> {
    return this.http.get<ServiceBooking[]>(this.apiUrl);
  }

  // Thêm dịch vụ đặt chỗ
  addServiceBooking(serviceBooking: ServiceBooking): Observable<ServiceBooking> {
    return this.http.post<ServiceBooking>(this.apiUrl, serviceBooking);
  }

  // Cập nhật dịch vụ đặt chỗ
  updateServiceBooking(serviceBooking: ServiceBooking): Observable<ServiceBooking> {
    return this.http.patch<ServiceBooking>(`${this.apiUrl}/${serviceBooking._id}`, serviceBooking); // Giả sử serviceBooking._id là ID của dịch vụ đặt chỗ
  }

  // Xóa dịch vụ đặt chỗ
  deleteServiceBooking(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}