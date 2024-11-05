import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = []; // Category list
  dataSource = new MatTableDataSource<Category>();
  displayedColumns: string[] = ['name', 'description', 'status', 'actions'];
  isLoading = false; // Loading indicator
  errorMessage: string | null = null; // Error message
  isError: boolean = false; // Error state

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private snackBar: MatSnackBar, private categoryService: CategoryService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCategories(); // Load categories on init
  }

  loadCategories(): void {
    this.isLoading = true; // Set loading to true
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        console.log('Data returned from API:', data);

        if (Array.isArray(data)) {
          this.categories = data;
          this.dataSource.data = this.categories;
          this.dataSource.paginator = this.paginator;
        } else {
          console.error('Data is not in the expected format, not an array:', data);
          this.showNotification('Unexpected data format received.', 'error');
        }
        this.isLoading = false; // Set loading to false
      },
      (error: any) => {
        console.error('Error loading categories', error);
        this.errorMessage = 'Error loading categories'; // Set error message
        this.isError = true; // Set error state
        this.isLoading = false; // Set loading to false
      }
    );
  }

  addCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, { data: { category: null } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Added category:', result);
        this.loadCategories(); // Reload categories after adding
        this.showNotification('Thêm danh mục thành công!', 'success');
      } else {
        console.log('Adding category was canceled or not successful.');
      }
    });
  }
  
  editCategory(category: Category) {
    if (!category) {
      console.error('Invalid category to edit.');
      return;
    }

    const dialogRef = this.dialog.open(CategoryDialogComponent, { data: { category } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Edited category:', result);
        this.loadCategories(); // Reload categories after editing
        this.showNotification('Chỉnh sửa danh mục thành công!', 'success');
      } else {
        console.log('Editing category was canceled or not successful.');
      }
    });
  }

  deleteCategory(category: Category) {
    if (!category._id) {
      console.error('Cannot delete category because the ID is invalid.');
      return;
    }

    if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      this.categoryService.deleteCategory(category._id).subscribe(
        () => {
          console.log('Deleted category:', category);
          this.loadCategories(); // Reload categories after deleting
          this.showNotification('Xóa danh mục thành công!', 'success');
        },
        error => {
          console.error('Error deleting category:', error);
          this.errorMessage = 'Xóa danh mục thất bại!'; // Set error message
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