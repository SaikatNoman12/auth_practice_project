import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myRecFrom!: FormGroup;

  modalSwitch: boolean = true;

  constructor(
    private fBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

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
    if (this.myRecFrom.valid) {
      if (this.modalSwitch) {
        console.log('sign in');
        console.log(this.myRecFrom.value);
      }
      else {
        console.log('create account');
        console.log(this.myRecFrom.value);
      }
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
