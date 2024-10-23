import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../services/post.service'; // Dịch vụ quản lý bài viết
import { Post } from '../../models/post.model'; // Mô hình bài viết
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from './post-dialog/post-dialog.component'; // Component dialog cho bài viết
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management.component.html',
  styleUrls: ['./post-management.component.scss'],
})
export class PostManagementComponent implements OnInit {
  posts: Post[] = []; // Danh sách bài viết
  dataSource = new MatTableDataSource<Post>();
  displayedColumns: string[] = ['title', 'description', 'price', 'location', 'actions']; // Các cột hiển thị

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private postService: PostService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPosts(); // Tải bài viết khi khởi tạo
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe(
      (data: any) => {
        console.log('Dữ liệu trả về từ API:', data); // Log dữ liệu trả về
  
        if (Array.isArray(data)) {
          this.posts = data; // Cập nhật danh sách bài viết
          this.dataSource.data = this.posts; // Cập nhật dữ liệu cho MatTableDataSource
          this.dataSource.paginator = this.paginator; // Gán paginator cho dataSource
        } else {
          console.error('Dữ liệu không đúng cấu trúc, không phải mảng:', data);
          this.posts = [];
          this.dataSource.data = []; // Cập nhật dữ liệu nếu có lỗi
        }
      },
      (error: any) => {
        console.error('Lỗi khi lấy bài viết', error); // Log lỗi
        this.posts = [];
        this.dataSource.data = []; // Cập nhật dữ liệu nếu có lỗi
      }
    );
  }

  addPost() {
    const dialogRef = this.dialog.open(PostDialogComponent, { data: { post: null } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Đã thêm bài viết:', result); // Log kết quả thêm bài viết
        this.postService.addPost(result).subscribe(
          () => {
            console.log('Bài viết đã được thêm thành công.'); // Log thông báo thành công
            this.loadPosts(); // Reload posts after adding
          },
          error => {
            console.error('Lỗi khi thêm bài viết:', error); // Log lỗi khi thêm
          }
        );
      } else {
        console.log('Thêm bài viết bị hủy hoặc không thành công.'); // Log nếu không có kết quả
      }
    });
  }

  editPost(post: Post) {
    if (!post) {
      console.error('Bài viết không hợp lệ để chỉnh sửa.'); // Log nếu bài viết không hợp lệ
      return;
    }

    const dialogRef = this.dialog.open(PostDialogComponent, { data: { post } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Đã chỉnh sửa bài viết:', result); // Log kết quả chỉnh sửa bài viết
        this.postService.updatePost(result).subscribe(
          () => {
            console.log('Bài viết đã được chỉnh sửa thành công.'); // Log thông báo thành công
            this.loadPosts(); // Reload posts after editing
          },
          error => {
            console.error('Lỗi khi chỉnh sửa bài viết:', error); // Log lỗi khi chỉnh sửa
          }
        );
      } else {
        console.log('Chỉnh sửa bài viết bị hủy hoặc không thành công.'); // Log nếu không có kết quả
      }
    });
  }

  deletePost(post: Post) {
    if (post._id) {
      if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
        this.postService.deletePost(post._id).subscribe(() => {
          console.log('Bài viết đã được xóa:', post); // Log bài viết đã xóa
          this.loadPosts(); // Reload posts after deleting
        }, error => {
          console.error('Lỗi khi xóa bài viết:', error); // Log lỗi khi xóa
        });
      }
    } else {
      console.error('Không thể xóa bài viết vì ID không hợp lệ.'); // Log lỗi ID không hợp lệ
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Áp dụng bộ lọc
  }
}