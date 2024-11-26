import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from '../../../models/post.model';
import { CategoryService } from '../../../services/category.service'; 
import { UserService } from '../../../services/user.service'; 
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss'],
})
export class PostDialogComponent {
  post: Post;
  categories: any[] = [];
  services: any[] = [];
  users: any[] = [];

  serviceNameMap: { [key: string]: string } = {};

  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { post: Post },
    private categoryService: CategoryService,
    private userService: UserService,
    private serviceService: ServiceService
  ) {
    this.post = data.post ? { ...data.post } : { _id: '', userId: '', title: '', description: '', price: 0, location: '', area: '', images: [], categoryId: '', serviceId: '' }; // Khởi tạo bài viết
    this.loadCategories();
    this.loadUsers();
    this.loadServices();
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
  
  loadServices() {
    this.serviceService.getServices().subscribe(
      (data) => {
        console.log('Dữ liệu dịch vụ đặt chỗ:', data);
        this.services = Array.isArray(data) ? data : [];
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