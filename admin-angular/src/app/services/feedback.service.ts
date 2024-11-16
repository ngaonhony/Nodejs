import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Feedback } from '../models/feedback.model'; // Điều chỉnh đường dẫn nếu cần

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private apiUrl = 'http://localhost:3000/api/feedbacks'; // Cập nhật dựa trên API của bạn

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Lấy token từ local storage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Gửi token trong header
    });
  }

  // Tải tất cả phản hồi
  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error loading feedback', error);
        return of([]); // Trả về mảng rỗng khi có lỗi
      })
    );
  }

  
  // Chỉnh sửa phản hồi
  editFeedback(feedback: Feedback): Observable<Feedback | null> {
    return this.http.put<Feedback>(`${this.apiUrl}/${feedback._id}`, feedback, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error editing feedback', error);
        return of(null); // Trả về null khi có lỗi
      })
    );
  }

  // Xóa phản hồi
  deleteFeedback(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error deleting feedback', error);
        return of(); // Xử lý lỗi nhưng trả về void
      })
    );
  }
}