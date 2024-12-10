import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})

export class UserManagementComponent implements OnInit {
  users: User[] = [];
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['name', 'email', 'phone', 'role', 'actions'];
  isLoading = false; // Loading indicator
  errorMessage: string | null = null; // Error message
  isError: boolean = false; // Error state
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private snackBar: MatSnackBar, private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true; // Set loading to true
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        console.log('Data returned from API:', data);

        if (Array.isArray(data)) {
          this.users = data;
          this.dataSource.data = this.users;
          this.dataSource.paginator = this.paginator;
        } else {
          console.error('Data is not in the expected format, not an array:', data);
          this.showNotification('Unexpected data format received.', 'error');
        }
        this.isLoading = false; // Set loading to false
      },
      (error: any) => {
        console.error('Error loading users', error);
        this.errorMessage = 'Error loading users'; // Set error message
        this.isError = true; // Set error state
        this.isLoading = false; // Set loading to false
      }
    );
  }


  editUser(user: User) {
    if (!user) {
      console.error('Invalid user to edit.');
      return;
    }

    const dialogRef = this.dialog.open(UserDialogComponent, { data: { user } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Edited user:', result);
        this.loadUsers(); // Reload users after editing
        this.showNotification('Chỉnh sửa người dùng thành công!', 'success');
      } else {
        console.log('Editing user was canceled or not successful.');
      }
    });
  }

  deleteUser(user: User) {
    if (!user._id) {
      console.error('Cannot delete user because the ID is invalid.');
      return;
    }

    if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      this.userService.deleteUser(user._id).subscribe(
        () => {
          console.log('Deleted user:', user);
          this.loadUsers(); // Reload users after deleting
          this.showNotification('Xóa người dùng thành công!', 'success');
        },
        error => {
          console.error('Error deleting user:', error);
          this.errorMessage = 'Xóa người dùng thất bại!'; // Set error message
          this.isError = true; // Set error state
          this.showNotification(this.errorMessage, 'error');
        }
      );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showNotification(message: string, type: string) {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
    });
  }
}