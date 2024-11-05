import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  emailOrPhone: string = ''; // Variable to hold email or phone number
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']); 
    }
  }

  login(form: NgForm): void {
    if (form.invalid) {
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin.';
      return;
    }
  
    this.authService.login(this.emailOrPhone, this.password).subscribe(
      response => {
        this.authService.setToken(response.accessToken); // Ensure the correct token property is used
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.errorMessage = 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.';
        console.error('Login error:', error);
        if (error.error && error.error.message) {
          console.error('Error message from server:', error.error.message);
        } else {
          console.error('Unknown error:', error);
        }
      }
    );
  }
}