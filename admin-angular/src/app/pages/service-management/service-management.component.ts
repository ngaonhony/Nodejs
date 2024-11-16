import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../models/service.model';
import { MatDialog } from '@angular/material/dialog';
import { ServiceDialogComponent } from './service-dialog/service-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.scss'],
})
export class ServiceManagementComponent implements OnInit {
  services: Service[] = [];
  dataSource = new MatTableDataSource<Service>();
  displayedColumns: string[] = ['name', 'price_per_day', 'price_per_week', 'price_per_month','pushPrice', 'title_color', 'advantages', 'auto_approval', 'prominent_badge', 'actions'];
  isLoading = false; // Loading indicator
  errorMessage: string | null = null; // Error message
  isError: boolean = false; // Error state
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private serviceManagementService: ServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadServices(); // Load services on init
  }

  loadServices(): void {
    this.isLoading = true; // Set loading to true
    this.serviceManagementService.getServices().subscribe(
      (data: Service[]) => {
        console.log('Data returned from API:', data);
        this.services = data;
        this.dataSource.data = this.services;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false; // Set loading to false
      },
      (error: any) => {
        console.error('Error loading services', error);
        this.errorMessage = 'Error loading services'; // Set error message
        this.isError = true; // Set error state
        this.isLoading = false; // Set loading to false
      }
    );
  }

  addService() {
    const dialogRef = this.dialog.open(ServiceDialogComponent, { data: { service: null } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Added service:', result);
        this.loadServices(); // Reload services after adding
        this.showNotification('Thêm dịch vụ thành công!', 'success');
      } else {
        console.log('Adding service was canceled or not successful.');
      }
    });
  }

  editService(service: Service) {
    if (!service) {
      console.error('Invalid service to edit.');
      return;
    }

    const dialogRef = this.dialog.open(ServiceDialogComponent, { data: { service } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Edited service:', result);
        this.loadServices(); // Reload services after editing
        this.showNotification('Chỉnh sửa dịch vụ thành công!', 'success');
      } else {
        console.log('Editing service was canceled or not successful.');
      }
    });
  }

  deleteService(service: Service) {
    if (!service._id) {
      console.error('Cannot delete service because the ID is invalid.');
      return;
    }

    if (confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      this.serviceManagementService.deleteService(service._id).subscribe(
        () => {
          console.log('Deleted service:', service);
          this.loadServices(); // Reload services after deleting
          this.showNotification('Xóa dịch vụ thành công!', 'success');
        },
        error => {
          console.error('Error deleting service:', error);
          this.errorMessage = 'Xóa dịch vụ thất bại!'; // Set error message
          this.isError = true; // Set error state
          this.showNotification(this.errorMessage, 'error');
        }
      );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showNotification(message: string, type: string) {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
    });
  }
}