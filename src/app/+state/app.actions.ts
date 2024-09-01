import { LoginRequest } from '../shared/models/requests/login-request';
import { RegistrationRequest } from '../shared/models/requests/registration-request';

export class AppLoginAction {
  static readonly type = '[App] Login';
  constructor(public payload: LoginRequest) {}
}

export class AppRegisterAction {
  static readonly type = '[App] Register';
  constructor(public payload: RegistrationRequest) {}
}

export class AppLogoutAction {
  static readonly type = '[App] Logout';
}
