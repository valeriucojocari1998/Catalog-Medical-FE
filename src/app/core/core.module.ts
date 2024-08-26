import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './layout/wrapper/wrapper.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [WrapperComponent, NavbarComponent, FooterComponent],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
