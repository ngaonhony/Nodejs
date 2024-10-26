import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';   
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;

  constructor(public dialog: MatDialog,private authService: AuthService, private router: Router) {}

  onLogout(): void {
    this.authService.logout().subscribe(
      response => {
        console.log('Logout successful', response);
        localStorage.removeItem('token'); // Xóa token
        this.router.navigate(['/login']); // Điều hướng về trang đăng nhập
      },
      error => {
        console.error('Logout failed', error);
        // Xử lý lỗi nếu cần
      }
    );
  }
}
