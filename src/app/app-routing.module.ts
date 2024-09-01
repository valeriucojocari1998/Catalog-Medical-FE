import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from './core/layout/wrapper/wrapper.component';
import { WrapperInternalComponent } from './core/layout/wrapper-internal/wrapper-internal.component';
import { GuestGuard } from './shared/guards/guest.guard';
import { AuthGuard } from './shared/guards/auth.guard';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: WrapperComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/home/home.module').then((c) => c.HomeModule),
      },
    ],
    canActivate: [GuestGuard], // Only non-authenticated users can access
  },
  {
    path: 'login',
    component: WrapperComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/login/login.module').then((c) => c.LoginModule),
      },
    ],
    canActivate: [GuestGuard], // Only non-authenticated users can access
  },
  {
    path: 'home-internal',
    component: WrapperInternalComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/home/home.module').then((c) => c.HomeModule),
      },
    ],
    canActivate: [AuthGuard], // Only authenticated users can access
  },
  {
    path: 'patients',
    component: WrapperInternalComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import(
            './features/patient-management/patient-management.module'
          ).then((c) => c.PatientManagementModule),
      },
    ],
    canActivate: [AuthGuard], // Only authenticated users can access
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
