import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';

  onSubmit(emailForm: NgForm) {
    console.log('emailForm:', emailForm.value);
    
    if (emailForm.valid) {
      console.log('Username:', this.username);
      console.log('Password:', this.password);
    } else {
      console.log('Form is invalid');
    }
  }
}
