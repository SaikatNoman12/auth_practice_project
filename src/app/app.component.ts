import { AuthenticationService } from './appService/authService/authentication.service';
import { SmallService } from './appService/small.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angularAuthPractice';

  onActive: any;

  constructor(
    private _smallService: SmallService,
    private _authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this._smallService.displayHide.subscribe(
      res => {
        this.onActive = res;
      }
    );

    this._authService.autoSignIn();
  }


}
