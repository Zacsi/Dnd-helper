import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {
  
  SignUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  passwordsMatch(): boolean {
    const password = this.SignUpForm.get('password')?.value;
    const rePassword = this.SignUpForm.get('rePassword')?.value;
    return password === rePassword;
  }

  onSubmit() {
    if (this.SignUpForm.valid && this.passwordsMatch()) {
      const email = this.SignUpForm.get('email')?.value ?? ""; // Ensure default empty string if null
      const password = this.SignUpForm.get('password')?.value ?? ""; // Ensure default empty string if null
  
      if (email && password) { // Further check if not empty
        this.authService.signup(email, password).then(cred => {
          console.log(cred);
          this.router.navigateByUrl('/login');
        }).catch(error => {
          console.error(error);
          alert('Failed to register: ' + error.message);
        });
      }
    } else {
      alert('Please check your entries. Make sure all fields are filled correctly and passwords match.');
    }
  }
  

}