import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEmployeeRoutingModule } from './add-employee-routing.module';
import { AddEmployeeComponent } from './add-employee.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddEmployeeComponent
  ],
  imports: [
    CommonModule,
    AddEmployeeRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    AddEmployeeComponent
  ]
})
export class AddEmployeeModule { }
