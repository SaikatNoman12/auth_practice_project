import { AuthenticationService } from './../appService/authService/authentication.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AddEmployee } from './../appInterface/add-employee';
import { SmallService } from './../appService/small.service';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../appService/database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayFalse: any;

  dataBaseData: any | AddEmployee;

  showSpinner: boolean = false;

  profileInfo: any;

  constructor(
    private _smallService: SmallService,
    private _databaseData: DatabaseService,
    private _authService: AuthenticationService
  ) {

    this._smallService.displayHide.subscribe(
      (res: any) => {
        this.displayFalse = res;
      }
    );

    this._authService.profileInfo.subscribe(
      (res: any) => {
        this.profileInfo = res.displayName;
      }
    )

  }

  ngOnInit(): void {
    this.onGetDataBaseData();
  }

  onShowBack() {
    this.displayFalse = !this.displayFalse;
    // document.body.style.overflow = this.displayFalse ? 'hidden' : 'auto';
    // document.body.style.paddingRight = this.displayFalse ? '17px' : '0px';
    this._smallService.onScrollBarHiddenShowPopup(this.displayFalse);
    this._smallService.displayHide.next(this.displayFalse);
  }

  onGetDataBaseData() {
    this.showSpinner = true;

    // const userData = JSON.parse(localStorage.getItem('userData') as any);
    // if (userData) {
    this._databaseData.getDataInDB().subscribe(
      (res: any) => {
        if (res !== null) {
          this.dataBaseData = res;
          this.showSpinner = false;
        }
      },
      (err: any) => { }
    );
    // }
    // else {
    //   this.router.navigate(['']);
    // }

  }


  // delete database data:-
  deleteDbData(userId: string) {
    this._databaseData.deleteDataBaseData(userId).subscribe(
      (res: any) => {
        if (res === null) {
          this.onGetDataBaseData();
        }
      },
      (err: any) => {

      }
    );
  }


  

}
