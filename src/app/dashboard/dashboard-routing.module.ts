import { AuthGuard } from './../appGurd/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { DashboardModule } from './dashboard.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: ':userId',
    canActivate: [AuthGuard],
    loadChildren: () => import('../view-employee/view-employee.module').then(m => m.ViewEmployeeModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
