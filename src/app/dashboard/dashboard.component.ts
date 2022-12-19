import { SmallService } from './../appService/small.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayFalse: any;

  constructor(
    private _smallService: SmallService
  ) {
    this._smallService.displayHide.subscribe(
      (res: any) => {
        this.displayFalse = res;
      }
    )
  }

  ngOnInit(): void {
  }

  onShowBack() {
    this.displayFalse = !this.displayFalse;
    this._smallService.displayHide.next(this.displayFalse);
  }

}
