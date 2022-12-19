import { SmallService } from './../appService/small.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  displayHide: any;

  constructor(
    private _smallService: SmallService
  ) {
    this._smallService.displayHide.subscribe(
      (res: any) => {
        this.displayHide = res;
      }
    )
  }

  ngOnInit(): void {
  }

  onShowBack() {
    this.displayHide = !this.displayHide;
    this._smallService.displayHide.next(this.displayHide);
  }

}
