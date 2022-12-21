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

  constructor(
    private _smallService: SmallService,
    private _databaseData: DatabaseService
  ) {

    this._smallService.displayHide.subscribe(
      (res: any) => {
        this.displayFalse = res;
      }
    );

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
    this._databaseData.getDataInDB().subscribe(
      (res: any) => {
        this.dataBaseData = res;
        console.log(this.dataBaseData);
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

}
