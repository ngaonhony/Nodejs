import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management.component.html',
  styleUrls: ['./post-management.component.scss'],
})
export class PostManagementComponent implements OnInit {
  dataSource = new MatTableDataSource<any>(); 
  displayedColumns: string[] = [
    'title',
    'price',
    'area',
    'user',
    'category',
    'service',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private postService: PostService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(
      (data: any[]) => { // Sử dụng any[] thay vì Post[]
        if (Array.isArray(data)) {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
        } else {
          console.error('Dữ liệu không đúng cấu trúc, không phải mảng:', data);
          this.resetDataSource();
        }
      },
      (error: any) => {
        console.error('Lỗi khi lấy bài viết', error);
        this.resetDataSource();
      }
    );
  }

  resetDataSource(): void {
    this.dataSource.data = [];
  }

  addPost(): void {
    const dialogRef = this.dialog.open(PostDialogComponent, {
      width: '1100px',
      data: { post: null }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Bài viết đã được thêm thành công!', 'Đóng', {
          duration: 3000,
        });
        this.loadPosts();
      }
    });
  }

  editPost(post: any): void {
    if (!post || !post._id) {
      console.error('Bài viết không hợp lệ để chỉnh sửa.');
      return;
    }
  
    const dialogRef = this.dialog.open(PostDialogComponent, { data: { post } });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Bài viết đã được chỉnh sửa thành công!', 'Đóng', {
          duration: 3000,
        });
      }
      this.loadPosts();
    });
  }

  deletePost(post: any): void { // Sử dụng any thay vì Post
    if (post._id) {
      if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
        this.postService.deletePost(post._id).subscribe(
          () => {
            this.loadPosts();
            this.snackBar.open('Bài viết đã được xóa thành công!', 'Đóng', {
              duration: 3000,
            });
          },
          (error) => {
            console.error('Lỗi khi xóa bài viết:', error);
            this.snackBar.open('Lỗi khi xóa bài viết.', 'Đóng', {
              duration: 3000,
            });
          }
        );
      }
    } else {
      console.error('Không thể xóa bài viết vì ID không hợp lệ.');
      this.snackBar.open('Không thể xóa bài viết vì ID không hợp lệ.', 'Đóng', {
        duration: 3000,
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}