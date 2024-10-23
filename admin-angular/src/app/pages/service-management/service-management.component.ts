import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../models/service.model';
import { MatDialog } from '@angular/material/dialog';
import { ServiceDialogComponent } from './service-dialog/service-dialog.component';
import { MatTableDataSource  } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.scss'],
})
export class ServiceManagementComponent implements OnInit {
  services: Service[] = [];
  dataSource = new MatTableDataSource<Service>();
  displayedColumns: string[] = ['name', 'price_per_day', 'price_per_week', 'price_per_month', 'advantages', 'title_color', 'auto_approval', 'prominent_badge','list', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private serviceManagementService: ServiceService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceManagementService.getServices().subscribe((data) => {
      console.log('Dữ liệu trả về từ API:', data);
      if (Array.isArray(data)) {
        this.services = data;
        this.dataSource.data = this.services;
        this.dataSource.paginator = this.paginator;
      } else {
        console.error('Dữ liệu không đúng cấu trúc, không phải mảng:', data);
        this.services = [];
        this.dataSource.data = [];
      }
    });
  }

  addService() {
    const dialogRef = this.dialog.open(ServiceDialogComponent, { data: { service: null } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.serviceManagementService.addService(result).subscribe(() => {
          this.loadServices();
        });
      }
    });
  }

  editService(service: Service) {
    if (!service) {
      console.error('Dịch vụ không hợp lệ để chỉnh sửa.'); // Log nếu dịch vụ không hợp lệ
      return;
    }
  
    const dialogRef = this.dialog.open(ServiceDialogComponent, { data: { service, isEditMode: true } });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Đã chỉnh sửa dịch vụ:', result); // Log kết quả chỉnh sửa dịch vụ
        // Cập nhật dịch vụ trong danh sách
        this.loadServices();
      } else {
        console.log('Chỉnh sửa dịch vụ bị hủy hoặc không thành công.'); // Log nếu không có kết quả
      }
    });
  }

  deleteService(service: Service) {
    if (service._id && confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      this.serviceManagementService.deleteService(service._id).subscribe(() => {
        this.loadServices();
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  viewBookedServices() {
    // Logic để hiển thị dịch vụ đã đặt
    // Bạn có thể mở một dialog hoặc chuyển hướng đến một component khác
    console.log('Xem danh sách dịch vụ đã đặt');
    // Ví dụ: mở dialog
    // const dialogRef = this.dialog.open(BookedServicesDialogComponent);
  }
}