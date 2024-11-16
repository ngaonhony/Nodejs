import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar'; // Nhập MatSnackBar

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management.component.html',
  styleUrls: ['./post-management.component.scss'],
})
export class PostManagementComponent implements OnInit {
  posts: Post[] = [];
  dataSource = new MatTableDataSource<Post>();

  displayedColumns: string[] = [
    'title',
    'description',
    'price',
    'location',
    'area',
    'user',
    'category',
    'serviceBooking',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private postService: PostService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar, // Thêm dòng này
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(
      (data: Post[]) => {
        if (Array.isArray(data)) {
          this.posts = data;
          this.dataSource.data = this.posts;
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
    this.posts = [];
    this.dataSource.data = [];
  }

  editPost(post: Post): void {
    if (!post) {
      console.error('Bài viết không hợp lệ để chỉnh sửa.');
      return;
    }

    const dialogRef = this.dialog.open(PostDialogComponent, { data: { post } });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.postService.updatePost(result).subscribe(
          () => {
            this.loadPosts();
            this.snackBar.open('Bài viết đã được chỉnh sửa thành công!', 'Đóng', {
              duration: 3000,
            });
          },
          (error) => {
            console.error('Lỗi khi chỉnh sửa bài viết:', error);
            this.snackBar.open('Lỗi khi chỉnh sửa bài viết.', 'Đóng', {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  deletePost(post: Post): void {
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