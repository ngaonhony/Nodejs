import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/posts'; // Thay thế bằng URL API của bạn

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Lấy token từ local storage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Gửi token trong header
    });
  }

  // Phương thức để lấy danh sách bài viết
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}`, { headers: this.getHeaders() });
  }

  // Phương thức để thêm bài viết
  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}`, post, { headers: this.getHeaders() });
  }

  // Phương thức để cập nhật bài viết
  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${post._id}`, post, { headers: this.getHeaders() });
  }

  // Phương thức để xóa bài viết
  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}