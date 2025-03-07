import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
      RouterLink,
      RouterLinkActive,
      CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router, private authService: AuthService) { }
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated(); 
  }
  
  onAddNewTaskItem() {
    console.log('New Task Item Added');

    this.router.navigate(['/create']);
  }

  onLogout() {
    console.log('Logout');
    //this.router.navigate(['/login']);
  }

}
