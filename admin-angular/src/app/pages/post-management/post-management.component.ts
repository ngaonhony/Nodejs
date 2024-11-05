import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { ServiceBookingService } from '../../services/service-booking.service';

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
    'user', // Cột người dùng
    'category', // Cột danh mục
    'serviceBooking', // Cột dịch vụ đặt chỗ
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private postService: PostService,
    private dialog: MatDialog,
    private userService: UserService,
    private categoryService: CategoryService,
    private serviceBookingService: ServiceBookingService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(
      (data: Post[]) => {
        console.log('Dữ liệu trả về từ API:', data);

        if (Array.isArray(data)) {
          this.posts = data;
          this.dataSource.data = this.posts;
          this.dataSource.paginator = this.paginator;

          this.posts.forEach((post) => {
            console.log('Bài viết:', post);
          });
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
        console.log('Đã chỉnh sửa bài viết:', result);
        this.postService.updatePost(result).subscribe(
          () => {
            console.log('Bài viết đã được chỉnh sửa thành công.');
            this.loadPosts();
          },
          (error) => {
            console.error('Lỗi khi chỉnh sửa bài viết:', error);
          }
        );
      } else {
        console.log('Chỉnh sửa bài viết bị hủy hoặc không thành công.');
      }
    });
  }

  deletePost(post: Post): void {
    if (post._id) {
      if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
        this.postService.deletePost(post._id).subscribe(
          () => {
            console.log('Bài viết đã được xóa:', post);
            this.loadPosts();
          },
          (error) => {
            console.error('Lỗi khi xóa bài viết:', error);
          }
        );
      }
    } else {
      console.error('Không thể xóa bài viết vì ID không hợp lệ.');
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
