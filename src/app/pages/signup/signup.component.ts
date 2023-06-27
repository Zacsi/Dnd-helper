import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {
  
  SignUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormControl(''),
  });

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const email = this.SignUpForm.get('email')?.value;
    const password = this.SignUpForm.get('password')?.value;
  
    if(email && password) {
      this.authService.signup(email, password).then(cred =>{
          console.log(cred);
          this.router.navigateByUrl('/login')
      }).catch(error => {
        console.error(error);
      });
    }
  }

}