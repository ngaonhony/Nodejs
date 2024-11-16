import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Feedback } from '../../../models/feedback.model';
import { User } from '../../../models/user.model'; // Đảm bảo đường dẫn đúng
import { Post } from '../../../models/post.model'; // Đảm bảo đường dẫn đúng

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss'],
})
export class FeedbackDialogComponent {
  feedback: Feedback;
  users: User[] = []; // Mảng người dùng
  posts: Post[] = []; // Mảng bài viết

  constructor(
    public dialogRef: MatDialogRef<FeedbackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { feedback: Feedback; users: User[]; posts: Post[] }
  ) {
    this.feedback = data.feedback || {
      postId: '',
      userId: '',
      name: '',
      phone: '',
      rating: 0,
      comment: '',
    };
    this.users = data.users || []; // Nhận dữ liệu người dùng
    this.posts = data.posts || []; // Nhận dữ liệu bài viết
  }

  onSave(): void {
    this.dialogRef.close(this.feedback);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}