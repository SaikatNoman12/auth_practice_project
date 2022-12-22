import { SmallService } from './../appService/small.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../appService/authService/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(
    private _smallService: SmallService,
    private _authService: AuthenticationService
  ) { }

  myRecForm: any;

  ngOnInit(): void {

    this._authService.user.subscribe(
      (res: any) => {
        this.isLoggedIn = !!res;
      }
    );

    this._smallService.myRecForm.subscribe(
      (res: any) => {
        this.myRecForm = res;
      }
    );

  }


  onSignOut() {
    this._authService.signOut();
  }

  onEditFrom() {
    this._smallService.onEditFunc(this.myRecForm);
  }

}
