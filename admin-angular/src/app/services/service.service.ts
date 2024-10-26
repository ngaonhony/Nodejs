import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model'; // Đảm bảo bạn đã định nghĩa model Service

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private apiUrl = 'http://localhost:3000/api/services'; // Cập nhật đường dẫn đến backend của bạn

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Lấy token từ local storage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Gửi token trong header
    });
  }

  // Lấy danh sách dịch vụ
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Thêm một dịch vụ mới
  addService(service: Omit<Service, '_id' | 'createdAt' | 'updatedAt'>): Observable<Service> {
    return this.http.post<Service>(this.apiUrl, service, { headers: this.getHeaders() });
  }

  // Cập nhật một dịch vụ hiện có
  updateService(service: Service): Observable<Service> {
    return this.http.put<Service>(`${this.apiUrl}/${service._id}`, service, { headers: this.getHeaders() });
  }

  // Xóa một dịch vụ
  deleteService(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}