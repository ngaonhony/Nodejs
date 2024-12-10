import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service'; 
import { CategoryService } from '../../../services/category.service'; 
import { UserService } from '../../../services/user.service'; 
import { ServiceService } from '../../../services/service.service';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss'],
})
export class PostDialogComponent {
  postForm: FormGroup;
  isEditMode: boolean = false;
  categories: any[] = [];
  services: any[] = [];
  users: any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { post: any }, // Sử dụng any thay vì Post
    private postService: PostService,
    private categoryService: CategoryService,
    private userService: UserService,
    private serviceService: ServiceService
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      location: [''],
      area: ['', Validators.required],
      categoryId: ['', Validators.required],
      serviceId: [''],
      status: ['active', Validators.required], // Giá trị mặc định
    });

    if (data.post) {
      this.isEditMode = true;
      this.postForm.patchValue(data.post);
      console.log('Post data in dialog:', data.post);
    }

    this.loadCategories();
    this.loadUsers();
    this.loadServices();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = Array.isArray(data) ? data : [];
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }
  
  loadCategories() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = Array.isArray(data) ? data : [];
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  
  loadServices() {
    this.serviceService.getServices().subscribe(
      data => {
        this.services = Array.isArray(data) ? data : [];
      },
      error => {
        console.error('Error fetching services:', error);
      }
    );
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.postForm.patchValue({
        image: file // Lưu tệp trong form
      });
    }
  }
  savePost() {
    if (this.postForm.valid) {
      const postData = this.postForm.value;
      const currentDate = new Date();
      const daysToAdd = postData.daysToAdd || 0;
      const expirationDate = new Date(currentDate);
      expirationDate.setDate(currentDate.getDate() + daysToAdd);
      if (!this.isEditMode) {
        postData.expiredAt = expirationDate.toISOString();
      }
      console.log(postData);
      const formData = new FormData();
      Object.keys(postData).forEach(key => {
        if (postData.image) {
          formData.append('image', postData.image);
        } else if (key !== 'daysToAdd') { 
          formData.append(key, postData[key]);
        }
      });
  
      if (this.isEditMode) {
        const postId = this.data.post._id; 
        console.log('Post ID:', postId);
        if (!postId) {
          console.error('Invalid post ID.');
          return;
        }
        this.postService.updatePost(postId, formData).subscribe(
          () => {
            this.dialogRef.close(true);
          },
          error => {
            console.error('Error updating post', error);
          }
        );
      } else {
        this.postService.addPost(formData).subscribe(() => {
          this.dialogRef.close(true);
        }, error => {
          console.error('Error adding post', error);
        });
      }
    } else {
      console.error('Form không hợp lệ');
    }
  }

  close() {
    this.dialogRef.close();
  }
}