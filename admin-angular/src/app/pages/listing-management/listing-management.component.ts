import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Listing } from '../../models/listing.model'; // Đường dẫn đến file model

@Component({
  selector: 'app-listing-management',
  standalone: true,
  imports: [],
  templateUrl: './listing-management.component.html',
  styleUrl: './listing-management.component.scss'
})

export class ListingComponent implements OnInit {
  listings: Listing[] = [];
  apiUrl = 'http://localhost:3000/api/listings'; // Địa chỉ API

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getListings();
  }

  getListings() {
    this.http.get<Listing[]>(this.apiUrl).subscribe(data => {
      this.listings = data;
    });
  }

  addListing(newListing: Listing) {
    this.http.post<Listing>(this.apiUrl, newListing).subscribe(data => {
      this.listings.push(data);
    });
  }

  deleteListing(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.listings = this.listings.filter(item => item.id !== id);
    });
  }
}