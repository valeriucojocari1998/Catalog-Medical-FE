import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import {
  AppLoginAction,
  AppRegisterAction,
  AppLogoutAction,
} from './app.actions';
import { throwError } from 'rxjs';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthorizationService } from '../shared/services/authorization.service';

export interface AppStateModel {
  token: string | null;
  userName: string | null;
  isAuthenticated: boolean;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    token: null,
    userName: null,
    isAuthenticated: false,
  },
})
@Injectable()
export class AppState {
  constructor(private authorizationService: AuthorizationService) {}

  @Selector()
  static isAuthenticated(state: AppStateModel): boolean {
    return state.isAuthenticated;
  }

  @Selector()
  static token(state: AppStateModel): string | null {
    return state.token;
  }

  @Selector()
  static username(state: AppStateModel): string | null {
    return state.userName;
  }

  @Action(AppLoginAction)
  login(
    { setState }: StateContext<AppStateModel>,
    { payload }: AppLoginAction
  ) {
    return this.authorizationService.LoginRequest(payload).pipe(
      tap((result: any) => {
        setState({
          token: result.token,
          userName: payload.userName,
          isAuthenticated: true,
        });
      }),
      catchError((error) => {
        console.error('Login failed', error);
        return throwError(() => error);
      })
    );
  }

  @Action(AppRegisterAction)
  register(
    { setState }: StateContext<AppStateModel>,
    { payload }: AppRegisterAction
  ) {
    return this.authorizationService.RegistrationRequest(payload).pipe(
      tap((result: any) => {
        setState({
          token: result.token,
          userName: payload.userName,
          isAuthenticated: true,
        });
      }),
      catchError((error) => {
        console.error('Registration failed', error);
        return throwError(() => error);
      })
    );
  }

  @Action(AppLogoutAction)
  logout({ setState }: StateContext<AppStateModel>) {
    return this.authorizationService.LogoutRequest().pipe(
      tap(() => {
        setState({
          token: null,
          userName: null,
          isAuthenticated: false,
        });
      }),
      catchError((error) => {
        console.error('Logout failed', error);
        return throwError(() => error);
      })
    );
  }
}
