import { Router } from '@angular/router';
import { SignUpResponse } from './../../appInterface/authInterface/sign-up-responce';
import { config } from './../../appConfig/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap, BehaviorSubject } from 'rxjs';
import { ErrorHandlingService } from './error-handling.service';
import { User } from 'src/app/appModal/user.modal';
import { AddEmployee } from 'src/app/appInterface/add-employee';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // user subject:---
  user: any = new BehaviorSubject<any>(null);

  constructor(
    private router: Router,
    private http: HttpClient,
    private _errorService: ErrorHandlingService
  ) { }

  // use for signUp:----
  onSignUp(email: string, pass: string) {
    return this.http.post<any>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.API_KEY}`,
      {
        email: email,
        password: pass,
        returnSecureToken: true
      }).pipe(
        catchError(
          (err) => {
            return this._errorService.handleError(err);
          }
        ),
        tap(
          (res: SignUpResponse) => {
            this.authenticationUser(res.email, res.localId, res.idToken, +res.expiresIn);
          }
        )
      );
  }

  // use for signIn:----
  onSignIn(email: string, pass: string) {
    return this.http.post<any>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.API_KEY}`,
      {
        email: email,
        password: pass,
        returnSecureToken: true
      }).pipe(
        catchError(
          (err) => {
            return this._errorService.handleError(err);
          }
        ),
        tap(
          (res: SignUpResponse) => {
            this.authenticationUser(res.email, res.localId, res.idToken, +res.expiresIn);
          }
        )
      );
  }

  autoSignIn() {
    const userData = localStorage.getItem('userData');
    const parseData = JSON.parse(userData as any);

    if (!parseData) {
      return;
    }

    const loggedInUser = new User(parseData.email, parseData.id, parseData._token, new Date(parseData._tokenExpirationDate
    ));

    const locationData = location.pathname.substring(1);

    if (loggedInUser.token) {
      this.user.next(loggedInUser);
      console.log(locationData);
      this.router.navigate([locationData === '' ? 'dashboard' : locationData]);
    }

  }

  // authentication:----
  private authenticationUser(email: string, userId: string, token: string, expireIn: any) {
    const expirationDate = new Date(new Date().getTime() + expireIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);

    localStorage.setItem("userData", JSON.stringify(user));
  }



}
