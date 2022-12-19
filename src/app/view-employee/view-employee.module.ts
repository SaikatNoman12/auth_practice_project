import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewEmployeeRoutingModule } from './view-employee-routing.module';
import { ViewEmployeeComponent } from './view-employee.component';


@NgModule({
  declarations: [
    ViewEmployeeComponent
  ],
  imports: [
    CommonModule,
    ViewEmployeeRoutingModule
  ]
})
export class ViewEmployeeModule { }
