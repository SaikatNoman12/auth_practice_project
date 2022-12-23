import { SetUserProfile } from './../../appInterface/add-employee';
import { Router } from '@angular/router';
import { SignUpResponse } from './../../appInterface/authInterface/sign-up-responce';
import { config } from './../../appConfig/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap, BehaviorSubject, pipe } from 'rxjs';
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

  // use for auto sign:----
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
      this.router.navigate([locationData === '' ? 'dashboard' : locationData]);

      // auto signOut:----
      const exDue = new Date(parseData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoSignOut(exDue);

      this.getProfileData(loggedInUser.token);
    }

  }

  // authentication:----
  private authenticationUser(email: string, userId: string, token: string, expireIn: any) {
    const expirationDate = new Date(new Date().getTime() + expireIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);

    this.autoSignOut(expireIn * 1000);

    localStorage.setItem("userData", JSON.stringify(user));

    this.getProfileData(token);
  }

  // use for sign out:----
  exTimer: any;
  signOut() {
    this.user.next(null);
    this.router.navigate(['']);
    localStorage.removeItem('userData');

    if (this.exTimer) {
      clearTimeout(this.exTimer);
    }
    this.exTimer = null;
  }

  // use for auto signOut:----
  autoSignOut(expirationDuration: number) {
    this.exTimer = setTimeout(() => {
      this.signOut();
    }, expirationDuration);
  }

  // update profileData:----
  updateProfile(data: SetUserProfile) {
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${config.API_KEY}`, {
      idToken: data.userToken,
      displayName: data.name,
      photoUrl: data.photoUrl,
      returnSecureToken: true
    }).pipe(
      catchError(
        (err: any) => {
          return this._errorService.handleError(err);
        }
      ),

    );
  }

  // get profileData:----
  profileInfo: any = new BehaviorSubject({
    displayName: '',
    email: '',
    photoUrl: ''
  });
  getProfileData(token: string) {
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${config.API_KEY}`, {
      idToken: token
    }).subscribe(
      (response: any) => {
        this.profileInfo.next({
          displayName: response?.users[0]?.displayName ? response?.users[0]?.displayName : '',
          email: response?.users[0]?.email ? response?.users[0]?.email : '',
          photoUrl: response?.users[0]?.photoUrl ? response?.users[0]?.photoUrl : ''
        });
      }
    );
  }


  // use for change password:----
  onChangePassword(data: any) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${config.API_KEY}`, {
      idToken: data.idToken,
      password: data.password,
      returnSecureToken: true
    }).pipe(
      catchError(
        (err: any) => {
          return this._errorService.handleError(err);
        }
      )
    );
  }




}
