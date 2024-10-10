import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent {
  userForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: ['', Validators.required],
      balance: [0, [Validators.required, Validators.min(0)]],
      role: ['tenant', Validators.required],
    });

    if (data.user) {
      this.isEditMode = true;
      this.userForm.patchValue(data.user);
      console.log('Dữ liệu người dùng trong dialog:', data.user);
    }
  }

  saveUser() {
    if (this.userForm.valid) {
        const userData = this.userForm.value;

        // In ra dữ liệu người dùng trước khi gửi
        console.log('Dữ liệu người dùng:', userData);

        if (this.isEditMode) {
            // Lấy ID từ data.user
            const userId = this.data.user._id; // Đảm bảo rằng bạn sử dụng _id từ MongoDB
            console.log('ID người dùng:', userId);
            if (!userId) {
                console.error('ID người dùng không hợp lệ.');
                return;
            }
            // Gọi service cập nhật người dùng
            this.userService.updateUser({ ...userData, _id: userId }).subscribe(
              () => {
                  this.dialogRef.close(true);
              },
              error => {
                  console.error('Lỗi cập nhật người dùng', error); // In ra thông báo lỗi
              }
          );
        } else {
            // Gọi service thêm người dùng
            this.userService.addUser(userData).subscribe(() => {
                this.dialogRef.close(true);
            }, error => {
                console.error('Lỗi thêm người dùng', error);
            });
        }
    }
}

  close() {
    this.dialogRef.close();
  }
}