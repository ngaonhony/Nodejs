import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; // Đảm bảo bạn có model User

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // Update this to match your backend

  constructor(private http: HttpClient) {}

  // Lấy danh sách người dùng
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Thêm người dùng (nếu cần)
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${user._id}`, user); // Giả sử user.id là id của người dùng
  }

  // Xóa người dùng (nếu cần)
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}