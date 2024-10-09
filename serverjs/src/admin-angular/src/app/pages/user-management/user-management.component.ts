import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  newUser: User = { name: '', email: '' };
  displayedColumns: string[] = ['name', 'email', 'actions'];
  dataSource = new MatTableDataSource<User>(this.users);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.dataSource.data = this.users;
    });
  }

  addUser(): void {
    this.userService.addUser(this.newUser).subscribe(user => {
      this.users.push(user);
      this.dataSource.data = this.users;
      this.newUser = { name: '', email: '' }; // Reset form
    });
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
      this.dataSource.data = this.users;
    });
  }

  updateUser(user: User): void {
    // Thêm logic cập nhật nếu cần
  }
}