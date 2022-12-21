import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../appService/database.service';
import { AddEmployee } from '../appInterface/add-employee';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

  getId: any;
  getUserId: any;
  getDbUser: any | AddEmployee;

  showSpinner: boolean = true;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _databaseService: DatabaseService
  ) { }

  ngOnInit(): void {

    this.getId = this._activatedRoute.params.subscribe(
      (params: Params) => {
        this.getUserId = params['userId'].substring(2);
        this._databaseService.getSingleData(this.getUserId).subscribe(
          (res: any) => {
            if (res !== null) {
              this.getDbUser = res;
              this.showSpinner = false;
            }
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    );

  }

}
