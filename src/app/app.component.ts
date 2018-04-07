import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VNT-BOOTCAMP';

  constructor(private authService: AuthService) {
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
