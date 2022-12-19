import { SetUserProfile } from './../appInterface/add-employee';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // use for queryParams:-
  editMode: boolean = false;

  // use for form:-
  myRecForm!: FormGroup

  constructor(
    private router: Router,
    private fBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
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
      'name': [null, [Validators.required]],
      'photoUrl': [null, [Validators.required]],
    });
  }

  // get form control:-
  get fromControl() {
    return this.myRecForm.controls;
  }

  // this method use for form submit:-
  onRecFormSubmit(): void {
    if (this.myRecForm.valid) {
      const userData: SetUserProfile = this.myRecForm.value;
      console.log(userData);
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

}
