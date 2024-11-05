  import { Component, OnInit, ViewChild } from '@angular/core';
  import { ServiceBookingService } from '../../services/service-booking.service';
  import { ServiceBooking } from '../../models/serviceBooking.model';
  import { MatDialog } from '@angular/material/dialog';
  import { ServiceBookingDialogComponent } from './service-booking-dialog/service-booking-dialog.component';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';

  @Component({
    selector: 'app-service-booking-management',
    templateUrl: './service-booking-management.component.html',
    styleUrls: ['./service-booking-management.component.scss'],
  })
  export class ServiceBookingManagementComponent implements OnInit {
    servicebookings: ServiceBooking[] = [];
    dataSource = new MatTableDataSource<ServiceBooking>();
    displayedColumns: string[] = ['userId', 'serviceId', 'bookingDate', 'bookingTime', 'expiryDate', 'actions'];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private serviceBookingService: ServiceBookingService, private dialog: MatDialog) {}

    ngOnInit(): void {
      this.loadServiceBookings();
    }

    loadServiceBookings(): void {
      this.serviceBookingService.getServiceBookings().subscribe((data) => {
        console.log('Dữ liệu trả về từ API:', data);
        if (Array.isArray(data)) {
          this.servicebookings = data;
          this.dataSource.data = this.servicebookings;
          this.dataSource.paginator = this.paginator;
        } else {
          console.error('Dữ liệu không đúng cấu trúc, không phải mảng:', data);
          this.servicebookings = [];
          this.dataSource.data = [];
        }
      });
    }

    editBooking(booking: ServiceBooking) {
      const dialogRef = this.dialog.open(ServiceBookingDialogComponent, { data: { booking } });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.serviceBookingService.updateServiceBooking(result).subscribe(() => {
            this.loadServiceBookings();
          });
        }
      });
    }

    deleteBooking(booking: ServiceBooking) {
      if (booking._id && confirm("Bạn có chắc chắn muốn xóa đặt chỗ này?")) {
        this.serviceBookingService.deleteServiceBooking(booking._id).subscribe(() => {
          this.loadServiceBookings();
        });
      }
    }
  }