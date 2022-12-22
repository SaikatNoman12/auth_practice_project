import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './appGurd/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module')
      .then(m => m.LoginModule),
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
  },
  {
    path: 'change-password',
    canActivate: [AuthGuard],
    loadChildren: () => import('./chnage-password/chnage-password.module').then(m => m.ChnagePasswordModule),
  },
  {
    path: 'forget-password',
    canActivate: [AuthGuard],
    loadChildren: () => import('./forget-password/forget-password.module').then(m => m.ForgetPasswordModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
