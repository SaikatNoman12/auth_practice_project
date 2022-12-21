import { DashboardComponent } from './../dashboard/dashboard.component';
import { SmallService } from './../appService/small.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddEmployee } from '../appInterface/add-employee';
import { DatabaseService } from '../appService/database.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  displayHide: any;

  // reactive form:-
  myRecForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private _smallService: SmallService,
    private _databaseService: DatabaseService,
    private _dashBoardComponent: DashboardComponent
  ) {

    this._smallService.displayHide.subscribe(
      (res: any) => {
        this.displayHide = res;
      }
    );
  }

  ngOnInit(): void {

    this.myRecForm = this.fb.group({
      'name': [null, [Validators.required]],
      'designation': [null, [Validators.required]],
      'department': ['developer', [Validators.required]],
      'status': ['active', [Validators.required]],
    });


  }

  // get form control use for error handling:-
  get formControl() {
    return this.myRecForm.controls;
  }

  // reactive form submit method:-
  onRecFormSubmit() {

    if (this.myRecForm.valid) {
      const userData: AddEmployee = this.myRecForm.value;
      this._databaseService.postDataInDB(userData)
        .subscribe(
          (res: any) => {
            this._dashBoardComponent.onGetDataBaseData();
            this.onShow();
          },
          (err: any) => {
            console.log(err);
          }
        );
    }
    else {
      let key = Object.keys(this.formControl);
      key.filter(data => {
        let control = this.formControl[data];
        if (control.errors !== null) {
          control.markAsTouched();
        }
      });
    }

  }



  // on popup hide:-
  onShow() {
    this.displayHide = !this.displayHide;
    // document.body.style.overflow = this.displayHide ? 'hidden' : 'auto';
    // document.body.style.paddingRight = this.displayHide ? '17px' : '0px';
    this._smallService.onScrollBarHiddenShowPopup(this.displayHide);

    this._smallService.displayHide.next(this.displayHide);
  }

}
