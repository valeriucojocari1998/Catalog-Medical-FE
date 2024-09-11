import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import {
  AppLoginAction,
  AppRegisterAction,
  AppLogoutAction,
  VerifyTokenAction,
  FetchUserAction,
} from './app.actions';
import { throwError } from 'rxjs';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { AuthorizationService } from '../core/services/authorization.service';
import { LocalStorageService } from '../core/services/local-storage.service';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';

export interface AppStateModel {
  token: string | null;
  userName: string | null;
  userId: string | null; // New userId field
  isAuthenticated: boolean;
  loginException: string;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    token: null,
    userName: null,
    userId: null, // Initialize as null
    isAuthenticated: false,
    loginException: '',
  },
})
@Injectable()
export class AppState implements NgxsOnInit {
  constructor(
    private authorizationService: AuthorizationService,
    private localStorageService: LocalStorageService,
    private userService: UserService, // For fetching user data
    private router: Router
  ) {}

  ngxsOnInit(ctx: StateContext<AppStateModel>): void {
    const token = this.localStorageService.getToken();
    const userName = this.localStorageService.getUsername();

    if (token && userName) {
      this.updateState({
        token,
        userName,
      });
      ctx.patchState({
        token,
        userName,
      });
      ctx.dispatch(new VerifyTokenAction());
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

  @Selector()
  static userId(state: AppStateModel): string | null {
    return state.userId;
  }

  @Selector()
  static loginException(state: AppStateModel): string | null {
    return state.loginException;
  }

  private updateState(state: Partial<AppStateModel>) {
    if (state.token) {
      this.localStorageService.setToken(state.token);
    }
    if (state.userName) {
      this.localStorageService.setUsername(state.userName);
    }
  }

  private removeFromState() {
    this.localStorageService.clear();
  }

  @Action(VerifyTokenAction)
  verifyToken({ patchState, dispatch }: StateContext<AppStateModel>) {
    return this.authorizationService.VerifyTokenRequest().pipe(
      tap(() => {
        patchState({
          isAuthenticated: true,
        });
        dispatch(new FetchUserAction());
      }),
      catchError((error) => {
        patchState({
          isAuthenticated: false,
        });
        this.router.navigate(['/home']);
        this.removeFromState();
        console.error('Token verification failed', error);
        return throwError(() => error);
      })
    );
  }

  @Action(FetchUserAction)
  fetchUser({ patchState }: StateContext<AppStateModel>) {
    return this.userService.getUserInfo().pipe(
      tap((user) => {
        patchState({
          userId: user.id, // Set userId in the state
          userName: user.userName, // Set userName from the fetched data
        });
      }),
      catchError((error) => {
        console.error('Failed to fetch user info', error);
        return throwError(() => error);
      })
    );
  }

  @Action(AppLoginAction)
  login(
    { patchState, dispatch }: StateContext<AppStateModel>,
    { payload }: AppLoginAction
  ) {
    return this.authorizationService.LoginRequest(payload).pipe(
      tap((result: any) => {
        const newState: AppStateModel = {
          token: result.token,
          userName: payload.userName,
          userId: result.userId, // Assuming userId is returned in the login response
          isAuthenticated: true,
          loginException: '',
        };
        patchState(newState);
        this.updateState(newState);
        dispatch(new FetchUserAction()); // Fetch user info after login
        this.router.navigate(['/home-internal']);
      }),
      catchError((error) => {
        console.error('Login failed', error);
        patchState({ loginException: 'Wrong password or email' });
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
        dispatch(new AppLoginAction(payload)); // Automatically login after registration
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
          userId: null,
          isAuthenticated: false,
          loginException: '',
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
