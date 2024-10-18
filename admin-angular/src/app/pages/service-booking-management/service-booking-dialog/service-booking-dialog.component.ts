import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceBooking } from '../../../models/serviceBooking.model';

@Component({
  selector: 'app-service-booking-dialog',
  templateUrl: './service-booking-dialog.component.html',
  styleUrls: ['./service-booking-dialog.component.scss'],
})
export class ServiceBookingDialogComponent {
  booking: ServiceBooking;

  constructor(
    public dialogRef: MatDialogRef<ServiceBookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { booking: ServiceBooking }
  ) {
    this.booking = data.booking || {
      userId: '',
      serviceId: '',
      bookingDate: new Date(),
      bookingTime: 0,
      expiryDate: new Date(),
    };
  }

  onSave(): void {
    this.dialogRef.close(this.booking);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}