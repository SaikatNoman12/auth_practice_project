import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chnage-password',
  templateUrl: './chnage-password.component.html',
  styleUrls: ['./chnage-password.component.scss']
})
export class ChnagePasswordComponent implements OnInit {

  // use for form:-
  myRecForm !: FormGroup

  constructor(
    private fBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    // user for form:-
    this.myRecForm = this.fBuilder.group({
      'password': [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  // use for form control:-
  get formControl(){
    return this.myRecForm.controls;
  }

  // use for form method:
  onRecFormSubmit(){
    if(this.myRecForm.valid){
      console.log(this.myRecForm.value);
    }
    else{
      let key = Object.keys(this.formControl);
      key.filter(
        (data:any) => {
          let control = this.formControl[data];
          if(control.errors !== null){
            control.markAsTouched();
          }
        }
      );
    }
  }

}
