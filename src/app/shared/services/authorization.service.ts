import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/requests/login-request';
import { Observable, of } from 'rxjs';
import { RegistrationRequest } from '../models/requests/registration-request';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor() {}

  public LoginRequest(request: LoginRequest): Observable<unknown> {
    return of();
  }

  public RegistrationRequest(
    request: RegistrationRequest
  ): Observable<unknown> {
    return of();
  }

  public LogoutRequest(): Observable<unknown> {
    return of();
  }
}
