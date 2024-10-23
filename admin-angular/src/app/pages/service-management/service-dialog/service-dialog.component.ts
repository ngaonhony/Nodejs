import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../../services/service.service'; // Điều chỉnh đường dẫn theo cấu trúc dự án của bạn
import { Service } from '../../../models/service.model'; // Điều chỉnh đường dẫn theo cấu trúc dự án của bạn

@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.scss'],
})
export class ServiceDialogComponent {
  serviceForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ServiceDialogComponent>,
    private serviceService: ServiceService,
    @Inject(MAT_DIALOG_DATA) public data: { service: Service }
  ) {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      price_per_day: [0, [Validators.required, Validators.min(0)]],
      price_per_week: [0, [Validators.required, Validators.min(0)]],
      price_per_month: [0, [Validators.required, Validators.min(0)]],
      advantages: [false],
      title_color: ['', Validators.required],
      auto_approval: [false],
      prominent_badge: [false],
    });

    if (data.service) {
      this.isEditMode = true;
      this.serviceForm.patchValue(data.service);
      console.log('Dữ liệu dịch vụ trong dialog:', data.service);
    }
  }

  saveService() {
    if (this.serviceForm.valid) {
      const serviceData = this.serviceForm.value;

      // Log dữ liệu dịch vụ trước khi gửi
      console.log('Dữ liệu dịch vụ:', serviceData);

      if (this.isEditMode) {
        // Lấy ID từ data.service
        const serviceId = this.data.service._id; // Đảm bảo bạn sử dụng _id từ MongoDB
        console.log('ID dịch vụ:', serviceId);
        if (!serviceId) {
          console.error('ID dịch vụ không hợp lệ.');
          return;
        }
        // Gọi service để cập nhật dịch vụ
        this.serviceService.updateService({ ...serviceData, _id: serviceId }).subscribe(
          () => {
            this.dialogRef.close(true);
          },
          error => {
            console.error('Lỗi cập nhật dịch vụ', error); // Log thông báo lỗi
          }
        );
      } else {
        // Gọi service để thêm dịch vụ mới
        this.serviceService.addService(serviceData).subscribe(() => {
          this.dialogRef.close(true);
        }, error => {
          console.error('Lỗi thêm dịch vụ', error);
        });
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}