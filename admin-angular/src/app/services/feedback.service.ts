import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Feedback } from '../models/feedback.model'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private apiUrl = 'http://localhost:3000/api/feedbacks'; // Adjust based on your API

  constructor(private http: HttpClient) {}

  // Load all feedback
  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error loading feedback', error);
        return of([]); // Return an empty array on error
      })
    );
  }

  addFeedback(feedback: Feedback): Observable<Feedback | null> {
    return this.http.post<Feedback>(this.apiUrl, feedback).pipe(
      catchError((error) => {
        console.error('Error adding feedback', error);
        return of(null); // Return null on error
      })
    );
  }
  
  editFeedback(feedback: Feedback): Observable<Feedback | null> {
    return this.http.patch<Feedback>(`${this.apiUrl}/${feedback._id}`, feedback).pipe(
      catchError((error) => {
        console.error('Error editing feedback', error);
        return of(null); // Return null on error
      })
    );
  }

  // Delete feedback
  deleteFeedback(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting feedback', error);
        return of(); // Handle error but return void
      })
    );
  }
}