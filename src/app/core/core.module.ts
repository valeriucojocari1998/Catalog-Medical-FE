import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './layout/wrapper/wrapper.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [WrapperComponent, NavbarComponent, FooterComponent],
  imports: [CommonModule, RouterModule, FlexLayoutModule],
})
export class CoreModule {}
