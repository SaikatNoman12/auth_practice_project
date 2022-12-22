import { AuthenticationService } from './authService/authentication.service';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmallService implements OnInit {

  // add employee show and hide:--
  displayHide = new BehaviorSubject(false);
  proFileInfo: any;
  passChange: any = new BehaviorSubject(false);

  constructor(
    private _authService: AuthenticationService
  ) {

    this._authService.profileInfo.subscribe(
      (res: any) => {
        this.proFileInfo = res;
      }
    );
  }

  ngOnInit(): void {

  }

  // popup show then hide body scrollbar and popup hide then show body scrollbar:--
  onScrollBarHiddenShowPopup(displayHide: any) {
    document.body.style.overflow = displayHide ? 'hidden' : 'auto';
    document.body.style.paddingRight = displayHide ? '17px' : '0px';
  }

  // onMyRecForm:----
  myRecForm: any = new BehaviorSubject<any>(null);

  onEditFunc(myRecForm: any) {
    if (myRecForm !== null) {
      myRecForm.setValue({
        name: this.proFileInfo?.displayName === '' ? '' : this.proFileInfo?.displayName,
        photoUrl: this.proFileInfo?.photoUrl === '' ? '' : this.proFileInfo?.photoUrl
      });
    }
  }



}
