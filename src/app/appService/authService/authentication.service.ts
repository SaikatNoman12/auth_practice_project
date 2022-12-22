import { config } from './../../appConfig/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private _errorService: ErrorHandlingService
  ) { }


  // use for sign up:
  onSignUp(email: string, pass: string) {
    return this.http.post<any>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.API_KEY}`,
      {
        email: email,
        password: pass,
        returnSecureToken: true
      })
      .pipe(
        catchError(
          (err) => {
            return this._errorService.handleError(err);
          }
        )
      );
  }


  onSignIn(email: string, pass: string) {
    return this.http.post<any>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`,
      {
        email: email,
        password: pass,
        returnSecureToken: true
      })
      .pipe(
        catchError(
          (err) => {
            return this._errorService.handleError(err);
          }
        )
      );
  }






}
