import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/posts'; 
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
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}`, { headers: this.getHeaders() });
  }
  addPost(formData: FormData): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}`, formData, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error adding post:', error);
          return throwError(error); 
        })
      );
  }
  updatePost(postId: string, formData: FormData): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${postId}`, formData, { headers: this.getHeaders() });
  }
  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}