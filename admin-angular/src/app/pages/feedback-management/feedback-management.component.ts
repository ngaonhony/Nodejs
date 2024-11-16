import { Component, OnInit, ViewChild } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { UserService } from '../../services/user.service'; // Nhập UserService
import { PostService } from '../../services/post.service'; // Nhập PostService
import { Feedback } from '../../models/feedback.model';
import { User } from '../../models/user.model'; // Đảm bảo đường dẫn đúng
import { Post } from '../../models/post.model'; // Đảm bảo đường dẫn đúng
import { MatDialog } from '@angular/material/dialog';
import { FeedbackDialogComponent } from './feedback-dialog/feedback-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-feedback-management',
  templateUrl: './feedback-management.component.html',
  styleUrls: ['./feedback-management.component.scss'],
})
export class FeedbackManagementComponent implements OnInit {
  feedbacks: Feedback[] = [];
  users: User[] = []; // Mảng người dùng
  posts: Post[] = []; // Mảng bài viết
  dataSource = new MatTableDataSource<Feedback>();
  displayedColumns: string[] = ['postId', 'userId', 'name', 'phone', 'rating', 'comment', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private feedbackService: FeedbackService,
    private userService: UserService, // Khởi tạo UserService
    private postService: PostService, // Khởi tạo PostService
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadFeedbacks();
    this.loadUsers(); // Tải người dùng
    this.loadPosts(); // Tải bài viết
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe((data) => {
      this.feedbacks = data;
      this.dataSource.data = this.feedbacks;
      this.dataSource.paginator = this.paginator;
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  editFeedback(feedback: Feedback) {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, { 
      data: { feedback, users: this.users, posts: this.posts } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.feedbackService.editFeedback(result).subscribe(() => {
          this.loadFeedbacks();
        });
      }
    });
  }

  deleteFeedback(feedback: Feedback) {
    if (feedback._id && confirm("Bạn có chắc chắn muốn xóa phản hồi này?")) {
      this.feedbackService.deleteFeedback(feedback._id).subscribe(() => {
        this.loadFeedbacks();
      });
    }
  }
}