import { Component, OnInit, ViewChild } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../models/feedback.model';
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
  displayedColumns: string[] = ['name', 'phone', 'comment', 'createdAt', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private feedbackService: FeedbackService,
  ) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe((data) => {
      this.feedbacks = data;
      this.dataSource.data = this.feedbacks;
      this.dataSource.paginator = this.paginator;
    });
  }
  deleteFeedback(feedback: Feedback) {
    if (feedback._id && confirm("Bạn có chắc chắn muốn xóa phản hồi này?")) {
      this.feedbackService.deleteFeedback(feedback._id).subscribe(() => {
        this.loadFeedbacks();
      });
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}