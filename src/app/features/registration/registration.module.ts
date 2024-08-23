import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';


@NgModule({
  declarations: [RegistrationFormComponent, RegistrationPageComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule
  ]
})
export class RegistrationModule { }
