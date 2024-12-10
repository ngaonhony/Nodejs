import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../models/payment.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-payment-management',
  templateUrl: './payment-management.component.html',
  styleUrls: ['./payment-management.component.scss']
})
export class PaymentManagementComponent implements OnInit {
  payments: Payment[] = [];
  dataSource = new MatTableDataSource<Payment>();
  displayedColumns: string[] = ['paymentId', 'amount', 'date','paymentMethod', 'status', 'actions'];
  errorMessage: string = '';
  isError: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }
  loadPayments(): void {
    this.paymentService.getAllPayments().subscribe(
      (data) => {
        console.log('Data returned from API:', data);
        this.payments = data;
        this.dataSource.data = this.payments;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.errorMessage = 'Failed to load payments';
        this.isError = true;
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deletePayment(payment: Payment): void {
    if (confirm('Bạn có chắc chắn muốn xóa thanh toán này?')) {
      this.paymentService.deletePaymentById(payment.paymentId).subscribe(() => {
        this.loadPayments(); 
      }, error => {
        this.errorMessage = 'Failed to delete payment';
        this.isError = true;
      });
    }
  }
}