import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  // use for form:-
  myRecForm !: FormGroup;

  constructor(
    private fBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // use for form:-
    this.myRecForm = this.fBuilder.group({
      'email': [null, [Validators.required, Validators.email]]
    });
  }

  get formControl() {
    return this.myRecForm.controls;
  }

  // use for form:-
  onRecFormSubmit() {
    if (this.myRecForm.valid) {
      console.log('forget password');
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
      )

    }
  }

}
