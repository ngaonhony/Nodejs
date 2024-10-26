import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Thay đổi thành URL API của bạn

  constructor(private http: HttpClient, private router: Router) {}

  // Phương thức đăng nhập
  login(emailOrPhone: string, password: string): Observable<any> {
    const body = {
      email: emailOrPhone.includes('@') ? emailOrPhone : undefined,
      phone: !emailOrPhone.includes('@') ? emailOrPhone : undefined,
      password
    };
    return this.http.post<any>(`${this.apiUrl}/adminlogin`, body);
  }

  // Lưu token vào localStorage
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Lấy token từ localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

 
  isTokenExpired(token: string): boolean {
    if (!token) return true; // Nếu không có token, coi như đã hết hạn

    const payload = JSON.parse(atob(token.split('.')[1])); // Giải mã payload
    const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại (giây)

    return payload.exp < currentTime; // Kiểm tra xem token đã hết hạn chưa
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      return true; 
    } else {
      this.logout(); // Đăng xuất nếu token đã hết hạn
      return false;
    }
  }

  logout(): Observable<any> {
    console.log('Logging out...');
    return this.http.post<any>(`${this.apiUrl}/logout`, {});
  }
}