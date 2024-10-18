import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from '../../../models/post.model';
import { CategoryService } from '../../../services/category.service'; 
import { UserService } from '../../../services/user.service'; 
import { ServiceBookingService } from '../../../services/service-booking.service';
@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss'],
})
export class PostDialogComponent {
  post: Post;
  categories: any[] = [];
  serviceBookings: any[] = [];
  users: any[] = [];


  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { post: Post },
    private categoryService: CategoryService,
    private userService: UserService,
    private serviceBookingService: ServiceBookingService
  ) {
    this.post = data.post ? { ...data.post } : { _id: '', userId: '', title: '', description: '', price: 0, location: '', area: '', images: [], categoryId: '', serviceBookingId: '' }; // Khởi tạo bài viết
    this.loadCategories();
    this.loadUsers();
    this.loadServiceBookings();
  }
  loadUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        console.log('Dữ liệu người dùng:', data); // Kiểm tra dữ liệu
        this.users = Array.isArray(data) ? data : []; // Chỉ gán nếu là mảng
      },
      (error) => {
        console.error('Lỗi khi lấy người dùng:', error);
      }
    );
  }
  
  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (data) => {
        console.log('Dữ liệu danh mục:', data); // Kiểm tra dữ liệu
        this.categories = Array.isArray(data) ? data : []; // Chỉ gán nếu là mảng
      },
      (error) => {
        console.error('Lỗi khi lấy danh mục:', error);
      }
    );
  }
  
  loadServiceBookings() {
    this.serviceBookingService.getServiceBookings().subscribe(
      (data) => {
        console.log('Dữ liệu dịch vụ đặt chỗ:', data); // Kiểm tra dữ liệu
        this.serviceBookings = Array.isArray(data) ? data : []; // Chỉ gán nếu là mảng
      },
      (error) => {
        console.error('Lỗi khi lấy dịch vụ đặt chỗ:', error);
      }
    );
  }
  onCancel(): void {
    this.dialogRef.close(); // Đóng dialog
  }

  onSave(): void {
    this.dialogRef.close(this.post); // Đóng dialog và trả về bài viết
  }
}