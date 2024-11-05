import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Update with your API URL

  constructor(private http: HttpClient, private router: Router) {}

  // Login method
  login(emailOrPhone: string, password: string): Observable<any> {
    const body = {
      email: emailOrPhone.includes('@') ? emailOrPhone : undefined,
      phone: !emailOrPhone.includes('@') ? emailOrPhone : undefined,
      password
    };
  
    return this.http.post<any>(`${this.apiUrl}/adminlogin`, body).pipe(
      tap(response => {
        console.log('Login response:', response); // Log the response
        if (response.accessToken) {
          this.setToken(response.accessToken); // Ensure this is not undefined
        } else {
          console.error('Access token is undefined in response');
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }

  // Method to set token
  setToken(token: string): void {
    localStorage.setItem('token', token);
    console.log('Token saved to localStorage:', localStorage.getItem('token')); // Check if it's saved
  }
  // Method to get token
  getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log('Retrieved token from localStorage:', token); // Log the retrieved token
    return token;
  }

  // Method to check if token is expired
  isTokenExpired(token: string): boolean {
    if (!token) return true; // If no token, consider it expired

    const payload = JSON.parse(atob(token.split('.')[1])); // Decode payload
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    return payload.exp < currentTime; // Check if the token is expired
  }

  // Method to check if user is logged in
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      return true; 
    } else {
      this.logout(); // Logout if the token has expired
      return false;
    }
  }

  // Logout method
  logout(): Observable<any> {
    console.log('Logging out...');
    return this.http.post<any>(`${this.apiUrl}/logout`, {}); // Ensure this returns an Observable
  }
}