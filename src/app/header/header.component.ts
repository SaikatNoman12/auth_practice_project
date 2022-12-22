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
    private _authService: AuthenticationService
  ) { }

  ngOnInit(): void {

    this._authService.user.subscribe(
      (res: any) => {
        this.isLoggedIn = !!res;
      }
    )

  }

}
