import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './layout/wrapper/wrapper.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppState } from '../+state/app.state';
import { NavbarInternalComponent } from './components/navbar-internal/navbar-internal.component';
import { WrapperInternalComponent } from './layout/wrapper-internal/wrapper-internal.component';

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
    NgxsModule.forRoot([AppState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
})
export class CoreModule {}
