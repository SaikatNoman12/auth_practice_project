import { Router } from '@angular/router';
import { AuthenticationService } from './../appService/authService/authentication.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUpResponse } from '../appInterface/authInterface/sign-up-responce';
import { ErrorHandlingService } from '../appService/authService/error-handling.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorTextShow: unknown = null;
  myRecFrom!: FormGroup;
  modalSwitch: boolean = true;

  constructor(
    private router: Router,
    private fBuilder: FormBuilder,
    private _authService: AuthenticationService,
  ) { }

  ngOnInit(): void {

    // use my form:-
    this.myRecFrom = this.fBuilder.group({
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required, Validators.minLength(6)]]
    });

  }

  get formControl() {
    return this.myRecFrom.controls;
  }

  onCreateAcc() {
    this.modalSwitch = !this.modalSwitch;
  }

  onMyFormSubmit() {
    let recFormValue: {
      email: string;
      password: string;
    } = this.myRecFrom.value;

    let authObservable: Observable<SignUpResponse>;

    if (this.myRecFrom.valid) {
      if (this.modalSwitch) {
        // use for signIn:-------
        authObservable = this._authService.onSignIn(recFormValue.email, recFormValue.password);
      }
      else {
        // use for signUp:--------
        authObservable = this._authService.onSignUp(recFormValue.email, recFormValue.password);
      }
      // sign in and sign up:-------
      authObservable.subscribe(
        (res: any) => {
          this.router.navigate(['dashboard']);
        },
        (err: any) => {
          this.errorTextShow = err;
        }
      );

    }
    else {
      let key = Object.keys(this.formControl);
      key.filter(
        data => {
          let control = this.formControl[data];
          if (control.errors !== null) {
            control.markAsTouched();
          }
        }
      );
    }
  }



}
