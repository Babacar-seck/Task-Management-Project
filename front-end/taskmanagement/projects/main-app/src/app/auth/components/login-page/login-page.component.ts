import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, Signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router} from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  errorMessage: string = '';
  email: string = '';
  password: string = '';
  user: Signal<User | null>;

  constructor(private router: Router,
              private authService: AuthService) { 
          this.user = computed(() => this.authService.currentUser());
  }
  ngOnInit(): void {
    this.authService.currentUser();
    }


  onSubmit(loginForm: NgForm) {
    console.log('loginForm:', loginForm.value);
    if (loginForm.valid) {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      const loginData = { email: this.email, password: this.password };
      
      this.authService.login(loginData).subscribe({
        next: () => {
          console.log('Logged in successfully');
          this.router.navigate(['/taskItems']); 
        },
        error: (error: HttpErrorResponse) => {  
          console.error('Login failed', error);
          this.errorMessage = 'Login failed. Please try again.';}
      });
      
    } else {
      console.log('Form is invalid');
    }
  }

  onRegister() {
    console.log('Register');
    this.router.navigate(['/register']);
  }

  isAuthenticated(): boolean {

    return this.authService.isAuthenticated();
  }
}
