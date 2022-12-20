import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChnagePasswordRoutingModule } from './chnage-password-routing.module';
import { ChnagePasswordComponent } from './chnage-password.component';


@NgModule({
  declarations: [
    ChnagePasswordComponent
  ],
  imports: [
    CommonModule,
    ChnagePasswordRoutingModule,
    ReactiveFormsModule
  ]
})
export class ChnagePasswordModule { }
