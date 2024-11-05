import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api/categories'; // Update the URL accordingly

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Get token from local storage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Send token in header
    });
  }

  // Handle errors
  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error ${error.status}: ${error.error.message || error.message}`;
    }
    return throwError(errorMessage); // Throw the error message
  }

  // Get categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Add category
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Update category
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${category._id}`, category, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Delete category
  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }
}