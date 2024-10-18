import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../services/category.service'; // Dịch vụ quản lý danh mục
import { Category } from '../../models/category.model'; // Mô hình danh mục
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component'; // Component dialog cho danh mục
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = []; // Danh sách danh mục
  dataSource = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['name', 'description', 'status', 'actions']; // Các cột hiển thị

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private categoryService: CategoryService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCategories(); // Tải danh mục khi khởi tạo
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        console.log('Dữ liệu trả về từ API:', data); // Log dữ liệu trả về
  
        // Kiểm tra xem data có phải là một mảng không
        if (Array.isArray(data)) {
          this.categories = data; // Cập nhật danh sách danh mục
          this.dataSource.data = this.categories; // Cập nhật dữ liệu cho MatTableDataSource
          this.dataSource.paginator = this.paginator; // Gán paginator cho dataSource
        } else {
          console.error('Dữ liệu không đúng cấu trúc, không phải mảng:', data);
          this.categories = [];
          this.dataSource.data = []; // Cập nhật dữ liệu nếu có lỗi
        }
      },
      (error: any) => {
        console.error('Lỗi khi lấy danh mục', error); // Log lỗi
        this.categories = [];
        this.dataSource.data = []; // Cập nhật dữ liệu nếu có lỗi
      }
    );
  }

  addCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, { data: { category: null } });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Đã thêm danh mục:', result); // Log kết quả thêm danh mục
        this.loadCategories(); // Reload categories after adding
      } else {
        console.log('Thêm danh mục bị hủy hoặc không thành công.'); // Log nếu không có kết quả
      }
    });
  }
  
  editCategory(category: Category) {
    if (!category) {
      console.error('Danh mục không hợp lệ để chỉnh sửa.'); // Log nếu danh mục không hợp lệ
      return;
    }
  
    const dialogRef = this.dialog.open(CategoryDialogComponent, { data: { category } });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Đã chỉnh sửa danh mục:', result); // Log kết quả chỉnh sửa danh mục
        // Update the category in the categories array
        this.loadCategories();
      } else {
        console.log('Chỉnh sửa danh mục bị hủy hoặc không thành công.'); // Log nếu không có kết quả
      }
    });
  }
  deleteCategory(category: Category) {
    if (category._id) {
      if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
        this.categoryService.deleteCategory(category._id).subscribe(() => {
          console.log('Danh mục đã được xóa:', category); // Log danh mục đã xóa
          this.loadCategories(); // Reload categories after deleting
        }, error => {
          console.error('Lỗi khi xóa danh mục:', error); // Log lỗi khi xóa
        });
      }
    } else {
      console.error('Không thể xóa danh mục vì ID không hợp lệ.'); // Log lỗi ID không hợp lệ
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Áp dụng bộ lọc
  }
}