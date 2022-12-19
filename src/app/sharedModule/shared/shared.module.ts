import { SmallService } from './../../appService/small.service';
import { HeaderModule } from './../../header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderModule
  ],
  providers: [
    SmallService
  ]
})
export class SharedModule { }
