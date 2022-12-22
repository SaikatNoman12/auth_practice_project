import { SmallService } from './../appService/small.service';
import { HeaderComponent } from './../header/header.component';
import { AuthenticationService } from './../appService/authService/authentication.service';
import { SetUserProfile } from './../appInterface/add-employee';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // use for queryParams:-
  editMode: boolean = false;
  onShowSpinner: boolean = false;

  // use for form:-
  myRecForm!: FormGroup;

  // profile info:---
  profileInfo: any | SetUserProfile;

  constructor(
    private router: Router,
    private fBuilder: FormBuilder,
    private _smallService: SmallService,
    private activatedRoute: ActivatedRoute,
    private _authService: AuthenticationService,
  ) { }

  ngOnInit(): void {

    // use for queryParams:-
    this.activatedRoute.queryParamMap.subscribe(
      (res: any) => {
        // let qPrams = res.params.EditMode; // true or null;
        let qParams = res.get("EditMode");  // true or null;

        if (qParams !== null) {
          this.editMode = true;
        }
        else {
          this.editMode = false;
        }
      }
    );

    // use for form:-
    this.myRecForm = this.fBuilder.group({
      'name': ['', [Validators.required]],
      'photoUrl': ['', [Validators.required]],
    });


    this.onShowSpinner = true;
    this._authService.profileInfo.subscribe(
      (res: any) => {
        this.profileInfo = res;
        this.myRecForm.setValue({
          name: this.profileInfo.displayName,
          photoUrl: this.profileInfo.photoUrl
        });
        this.onShowSpinner = false;
      }
    );

    this._smallService.myRecForm.next(this.myRecForm);

  }


  // get form control:-
  get fromControl() {
    return this.myRecForm.controls;
  }

  // get localStorage data:---  
  userToken: any = JSON.parse(localStorage.getItem('userData') as any)._token;


  // this method use for form submit:-
  onRecFormSubmit(): void {
    if (this.myRecForm.valid) {
      const myUserObj: SetUserProfile = {
        userToken: this.userToken,
        ...this.myRecForm.value
      };

      this.onShowSpinner = true;

      this._authService.updateProfile(myUserObj)
        .subscribe(
          (res: any) => {
            this._authService.getProfileData(this.userToken);
            this.onShowSpinner = false;
          },
          (err: any) => {
            // console.log(err);
          }
        );
      this.router.navigate([], { queryParams: { Params: null } })
    }
    else {
      let key = Object.keys(this.fromControl);
      key.filter(
        (data: any) => {
          let control = this.fromControl[data];
          if (control.errors !== null) {
            control.markAsTouched();
          }
        }
      );
    }
  }

  // this method use in discard button:-
  onDiscard(): void {
    this.router.navigate([], { queryParams: { EditMode: null } })
  }

  onResetValue() {
    if (confirm('Are you sure your form is reset?')) {
      this.myRecForm.reset();
    }
  }

  onEditProfile() {
    this._smallService.onEditFunc(this.myRecForm);
  }

  public handleMissingImage(event: any) {
    (event.target as HTMLImageElement).style.display = 'none';
  }

}
