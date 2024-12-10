import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service'; // Adjust the path according to your project structure
import { Category } from '../../../models/category.model'; // Adjust the path according to your project structure

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent {
  categoryForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: { category: Category }
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      status: ['active', Validators.required], // Default status
    });

    if (data.category) {
      this.isEditMode = true;
      this.categoryForm.patchValue(data.category);
      console.log('Dữ liệu danh mục trong dialog:', data.category);
    }
  }

  saveCategory() {
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;
      if (this.isEditMode) {
        const categoryId = this.data.category._id; 
        console.log('ID danh mục:', categoryId);
        if (!categoryId) {
          console.error('ID danh mục không hợp lệ.');
          return;
        }
        this.categoryService.updateCategory({ ...categoryData, _id: categoryId }).subscribe(
          () => {
            this.dialogRef.close(true);
          },
          error => {
            console.error('Lỗi cập nhật danh mục', error);
          }
        );
      } else {
        this.categoryService.addCategory(categoryData).subscribe(() => {
          this.dialogRef.close(true);
        }, error => {
          console.error('Lỗi thêm danh mục', error);
        });
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}