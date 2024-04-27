import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userEmail: string | null = null;

  constructor(private auth: AngularFireAuth) { }

  login(email:string, password:string){
    return this.auth.signInWithEmailAndPassword(email,password);
  }
  signup(email:string, password:string){
    return this.auth.createUserWithEmailAndPassword(email,password);
  }
  signOut() {
    return this.auth.signOut();
  }
  setUserEmail(email: string | null): void {
    this.userEmail = email;
  }
  getUserEmail(): string | null {
    return this.userEmail;
  }
}