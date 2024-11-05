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
      (response: any) => { // Explicitly define response type
        console.log('Logout successful', response);
        localStorage.removeItem('token'); // Clear token
        this.router.navigate(['/login']); // Navigate to login page
      },
      (error: any) => { // Explicitly define error type
        console.error('Logout failed', error);
        // Handle error if necessary
      }
    );
  }
}
