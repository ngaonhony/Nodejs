import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model'; // Đảm bảo bạn đã định nghĩa model Service
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
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
    return this.http.get<Service[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  
  // Thêm một dịch vụ mới
  // Adding a service
addService(service: Omit<Service, '_id' | 'createdAt' | 'updatedAt'>): Observable<Service> {
  return this.http.post<Service>(this.apiUrl, service, { headers: this.getHeaders() }).pipe(
    catchError(err => {
      console.error('Error occurred while adding service:', err);
      return throwError(() => new Error('Could not add service.')); // You can customize this message
    })
  );
}

// Updating a service
updateService(service: Service): Observable<Service> {
  return this.http.put<Service>(`${this.apiUrl}/${service._id}`, service, { headers: this.getHeaders() }).pipe(
    catchError(err => {
      console.error('Error occurred while updating service:', err);
      return throwError(() => new Error('Could not update service.')); // You can customize this message
    })
  );
}
  
  // Xóa một dịch vụ
  deleteService(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  
  // Hàm xử lý lỗi
  private handleError(error: any) {
    console.error('An error occurred:', error); // Log the error
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}