import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './layout/wrapper/wrapper.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppState } from '../+state/app.state';
import { NavbarInternalComponent } from './components/navbar-internal/navbar-internal.component';
import { WrapperInternalComponent } from './layout/wrapper-internal/wrapper-internal.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { PatientState } from '../features/patient-management/+state/patient.state';
import { MedicalTestState } from '../features/medical-tests/+state/medical-test.state';

@NgModule({
  declarations: [
    WrapperComponent,
    NavbarComponent,
    FooterComponent,
    NavbarInternalComponent,
    WrapperInternalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatButtonModule,
    NgxsModule.forRoot([AppState, PatientState, MedicalTestState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CoreModule {}
