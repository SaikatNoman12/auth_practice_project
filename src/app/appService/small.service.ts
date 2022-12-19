import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmallService {

  // add employee show and hide:--
  displayHide = new BehaviorSubject(false);

  constructor() { }

}
