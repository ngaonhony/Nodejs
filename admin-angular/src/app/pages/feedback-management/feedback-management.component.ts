import { Component, OnInit, ViewChild } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../models/feedback.model';
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
  dataSource = new MatTableDataSource<Feedback>();
  displayedColumns: string[] = ['postId', 'userId', 'name', 'phone', 'rating', 'comment', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private feedbackService: FeedbackService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe((data) => {
      console.log('Dữ liệu trả về từ API:', data);
      this.feedbacks = data;
      this.dataSource.data = this.feedbacks;
      this.dataSource.paginator = this.paginator;
    });
  }

  addFeedback() {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, { data: { feedback: null } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.feedbackService.addFeedback(result).subscribe(() => {
          this.loadFeedbacks();
        });
      }
    });
  }

  editFeedback(feedback: Feedback) {
    const dialogRef = this.dialog.open(FeedbackDialogComponent, { data: { feedback } });

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