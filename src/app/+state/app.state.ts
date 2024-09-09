import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import {
  AppLoginAction,
  AppRegisterAction,
  AppLogoutAction,
} from './app.actions';
import { throwError } from 'rxjs';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { AuthorizationService } from '../core/services/authorization.service';
import { LocalStorageService } from '../core/services/local-storage.service';
import { Router } from '@angular/router';

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
export class AppState implements NgxsOnInit {
  constructor(
    private authorizationService: AuthorizationService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngxsOnInit(ctx: StateContext<any>): void {
    const token = this.localStorageService.getToken();
    const userName = this.localStorageService.getUsername();
    if (token && userName) {
      this.updateState({
        token,
        userName,
        isAuthenticated: true,
      });
      ctx.setState({
        token,
        userName,
        isAuthenticated: true,
      });
    }
  }

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

  private updateState(state: Partial<AppStateModel>) {
    this.localStorageService.setToken(state.token!);
    this.localStorageService.setUsername(state.userName!);
  }

  @Action(AppLoginAction)
  login(
    { patchState }: StateContext<AppStateModel>,
    { payload }: AppLoginAction
  ) {
    return this.authorizationService.LoginRequest(payload).pipe(
      tap((result: any) => {
        const newState: AppStateModel = {
          token: result.token,
          userName: payload.userName,
          isAuthenticated: true,
        };
        patchState(newState);
        this.updateState(newState);
        // Reload the page after successful login
        this.router.navigate(['/home-internal']);
      }),
      catchError((error) => {
        console.error('Login failed', error);
        return throwError(() => error);
      })
    );
  }

  @Action(AppRegisterAction)
  register(
    { dispatch }: StateContext<AppStateModel>,
    { payload }: AppRegisterAction
  ) {
    return this.authorizationService.RegistrationRequest(payload).pipe(
      tap(() => {
        // On successful registration, dispatch the login action
        dispatch(new AppLoginAction(payload));
      }),
      catchError((error) => {
        console.error('Registration failed', error);
        return throwError(() => error);
      })
    );
  }

  @Action(AppLogoutAction)
  logout({ setState }: StateContext<AppStateModel>) {
    console.log('here before');
    return this.authorizationService.LogoutRequest().pipe(
      tap(() => {
        console.log('here');
        setState({
          token: null,
          userName: null,
          isAuthenticated: false,
        });
        this.localStorageService.clear();
        this.router.navigate(['/home']);
      }),
      catchError((error) => {
        console.error('Logout failed', error);
        return throwError(() => error);
      })
    );
  }
}
