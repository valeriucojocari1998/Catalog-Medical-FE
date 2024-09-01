import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedMaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginPageComponent,
    LoginFormComponent,
    RegistrationFormComponent,
  ],
})
export class LoginModule {}
