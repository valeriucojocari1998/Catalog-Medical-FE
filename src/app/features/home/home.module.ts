import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HomeInternalComponent } from './components/home-internal-component/home-internal-component.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [HomeComponent, HomeInternalComponent],
  imports: [CommonModule, HomeRoutingModule, MatCardModule],
})
export class HomeModule {}
