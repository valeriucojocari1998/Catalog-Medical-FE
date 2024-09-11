import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HomeInternalComponent } from './components/home-internal-component/home-internal-component.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { GuestGuard } from 'src/app/shared/guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'profile',
    component: HomeInternalComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
