import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; // Đảm bảo bạn có model User

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // Đường dẫn đến API

  constructor(private http: HttpClient) {}

  // Lấy danh sách người dùng
  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage hoặc nơi bạn lưu trữ
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Thêm token vào header
    });

    return this.http.get<User[]>(this.apiUrl, { headers });
  }

  // Thêm người dùng (nếu cần)
  addUser(user: User): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<User>(this.apiUrl, user, { headers });
  }

  // Cập nhật người dùng
  updateUser(user: User): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.patch<User>(`${this.apiUrl}/${user._id}`, user, { headers });
  }

  // Xóa người dùng (nếu cần)
  deleteUser(id: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}