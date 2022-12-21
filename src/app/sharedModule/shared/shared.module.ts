import { SmallService } from './../../appService/small.service';
import { HeaderModule } from './../../header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService } from 'src/app/appService/database.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderModule
  ],
  providers: [
    SmallService,
    DatabaseService
  ]
})
export class SharedModule { }
