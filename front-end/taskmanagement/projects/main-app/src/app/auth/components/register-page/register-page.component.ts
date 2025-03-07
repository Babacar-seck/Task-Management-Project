import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  userForm: FormGroup;
  user!: User;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('User Data:', this.userForm.value);

      this.user = {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        password: this.userForm.value.password
      };
      this.userService.createUser(this.user).pipe(
          tap(() => {
            this.router.navigateByUrl('/login');
          })
        ).subscribe({
          next: () => alert('User created successfully!'),
          error: (err) => {
            console.error('Error creating user:', err);
            alert('Error creating user. Please try again.');
          }
        });
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
}

