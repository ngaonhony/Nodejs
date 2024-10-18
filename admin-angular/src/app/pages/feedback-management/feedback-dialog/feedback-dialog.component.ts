import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Feedback } from '../../../models/feedback.model';

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss'],
})
export class FeedbackDialogComponent {
  feedback: Feedback;

  constructor(
    public dialogRef: MatDialogRef<FeedbackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { feedback: Feedback }
  ) {
    this.feedback = data.feedback || {
      postId: '',
      userId: '',
      name: '',
      phone: '',
      rating: 0,
      comment: '',
    };
  }

  onSave(): void {
    this.dialogRef.close(this.feedback);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}