import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmallService {

  // add employee show and hide:--
  displayHide = new BehaviorSubject(false);

  constructor() { }


  // popup show then hide body scrollbar and popup hide then show body scrollbar:--
  onScrollBarHiddenShowPopup(displayHide: any) {
    document.body.style.overflow = displayHide ? 'hidden' : 'auto';
    document.body.style.paddingRight = displayHide ? '17px' : '0px';
  }

}
