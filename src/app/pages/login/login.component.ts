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
  userLoggedInEmail: string | null = null;  // Variable to store the email


  constructor(private router: Router, private authService: AuthService) { }


  
  ngOnInit(): void {
    this.userLoggedInEmail = this.authService.getUserEmail();  // Get email from the service

  }

  login() {
    if (this.email.value && this.password.value) {
      this.authService.login(this.email.value, this.password.value).then(cred => {
        this.authService.setUserEmail(this.email.value);
        this.userLoggedInEmail = this.email.value;  // Update the email variable
        this.router.navigateByUrl('/main');
      }).catch(error => {
        this.errorMessage = 'Authentication failed: ' + error.message;
        console.error(error);
      });
    } else {
      this.errorMessage = 'Please enter both email and password.';
    }
  }
  
  

  signOut() {
    this.authService.signOut().then(() => {
      this.authService.setUserEmail(null);  // Clear email in the service
      this.userLoggedInEmail = null;  // Clear the email variable
      this.router.navigateByUrl('/login');
    }).catch(error => {
      console.error('Failed to sign out:', error);
    });
  }
}

