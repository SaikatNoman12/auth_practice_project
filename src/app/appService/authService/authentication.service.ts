import { config } from './../../appConfig/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }


  // use for sign up:
  onSignUp(email: string, pass: string) {
    return this.http.post<any>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.API_KEY}`,
      {
        email: email,
        password: pass,
        returnSecureToken: true
      }
    );
  }


  onSignIn(email: string, pass: string) {
    return this.http.post<any>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`,
      {
        email: email,
        password: pass,
        returnSecureToken: true
      }
    );
  }






}
