import { SmallService } from './../appService/small.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../appService/authService/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chnage-password',
  templateUrl: './chnage-password.component.html',
  styleUrls: ['./chnage-password.component.scss']
})
export class ChnagePasswordComponent implements OnInit {

  // use for form:-
  myRecForm !: FormGroup;

  token: any = JSON.parse(localStorage.getItem('userData') as any)._token;

  constructor(
    private router: Router,
    private fBuilder: FormBuilder,
    private _smallService: SmallService,
    private _authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    // user for form:-
    this.myRecForm = this.fBuilder.group({
      'password': [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  // use for form control:-
  get formControl() {
    return this.myRecForm.controls;
  }

  // use for form method:
  onRecFormSubmit() {
    if (this.myRecForm.valid) {
      const data = {
        idToken: this.token,
        ...this.myRecForm.value
      };

      this._authService.onChangePassword(data).subscribe(
        (res: any) => {
          localStorage.removeItem('userData');
          this.router.navigate(['']);
          this._smallService.passChange.next(true);
          this._authService.signOut();
        },
        (err: any) => {
          console.log(err);
        }
      );

    }
    else {
      let key = Object.keys(this.formControl);
      key.filter(
        (data: any) => {
          let control = this.formControl[data];
          if (control.errors !== null) {
            control.markAsTouched();
          }
        }
      );
    }
  }

}
