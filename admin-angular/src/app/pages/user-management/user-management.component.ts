import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['username', 'email', 'phone', 'address', 'balance', 'role', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: any) => {
        this.users = data.data.users;
        this.dataSource.data = this.users; // Cập nhật dữ liệu cho MatTableDataSource
        this.dataSource.paginator = this.paginator; // Gán paginator cho dataSource
      },
      (error: any) => {
        console.error('Lỗi khi lấy người dùng', error);
        this.users = [];
        this.dataSource.data = []; // Cập nhật dữ liệu nếu có lỗi
      }
    );
  }


  editUser(user: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, { data: { user } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers(); // Reload users after editing
      }
    });
  }

  deleteUser(user: User) {
    if (user._id) {
      if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
        this.userService.deleteUser(user._id).subscribe(() => {
          this.loadUsers(); // Reload users after deleting
        });
      }
    } else {
      console.error('Không thể xóa người dùng vì ID không hợp lệ.');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Áp dụng bộ lọc
  }
}