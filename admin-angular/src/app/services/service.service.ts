import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model'; // Ensure you have the Service model defined

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private apiUrl = 'http://localhost:3000/api/services'; // Update this to match your backend

  constructor(private http: HttpClient) {}

  // Get list of services
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.apiUrl);
  }

  // Add a new service
  addService(service: Omit<Service, '_id' | 'createdAt' | 'updatedAt'>): Observable<Service> {
    return this.http.post<Service>(this.apiUrl, service);
  }

  // Update an existing service
  updateService(service: Service): Observable<Service> {
    return this.http.patch<Service>(`${this.apiUrl}/${service._id}`, service);
  }

  // Delete a service
  deleteService(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}