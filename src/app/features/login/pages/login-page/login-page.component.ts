import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppLoginAction, AppRegisterAction } from 'src/app/+state/app.actions';
import { LoginRequest } from 'src/app/shared/models/requests/login-request';
import { RegistrationRequest } from 'src/app/shared/models/requests/registration-request';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {}

  loginUser(request: LoginRequest): void {
    this.store.dispatch(new AppLoginAction(request));
  }

  registerUser(request: RegistrationRequest): void {
    this.store.dispatch(new AppRegisterAction(request));
  }
}
