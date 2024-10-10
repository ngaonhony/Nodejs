import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

declare var $: any;

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit, OnDestroy {
  users: User[] = [];
  dataTable: any;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: any) => {
        this.users = data.data.users;
        this.initializeDataTable();
      },
      (error: any) => {
        console.error('Lỗi khi lấy người dùng', error);
        this.users = [];
      }
    );
  }

  initializeDataTable() {
    setTimeout(() => {
      this.dataTable = $('#userTable').DataTable();
    }, 100);
  }

  addUser() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: { user: null },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: { user },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  deleteUser(user: User) {
    if (user._id) {
      if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
        this.userService.deleteUser(user._id).subscribe(() => {
          this.loadUsers();
        });
      }
    } else {
      console.error('Không thể xóa người dùng vì ID không hợp lệ.');
    }
  }

  ngOnDestroy(): void {
    if (this.dataTable) {
      this.dataTable.destroy();
    }
  }
}