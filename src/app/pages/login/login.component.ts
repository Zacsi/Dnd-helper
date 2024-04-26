import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');
  errorMessage: string = ''; // Store error messages

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    if (this.email.value && this.password.value) {
      this.authService.login(this.email.value, this.password.value).then(cred => {
        console.log(cred);
        this.router.navigateByUrl('/main');
      }).catch(error => {
        this.errorMessage = 'Authentication failed: ' + error.message; // Set error message
        console.error(error);
      });
    } else {
      this.errorMessage = 'Please enter both email and password.'; // Validation message
    }
  }

  signOut() {
    this.authService.signOut().then(() => {
      this.router.navigateByUrl('/login');
    }).catch(error => {
      console.error('Failed to sign out:', error);
    });
  }
}
