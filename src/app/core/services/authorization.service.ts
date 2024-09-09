import { Injectable } from '@angular/core';
import { LoginRequest } from '../../shared/models/requests/login-request';
import { Observable, of } from 'rxjs';
import { RegistrationRequest } from '../../shared/models/requests/registration-request';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private http: HttpClient) {}

  public LoginRequest(request: LoginRequest): Observable<unknown> {
    return this.http.post<unknown>(
      `${environment.apiUrl}api/Auth/login`,
      request
    );
  }

  public RegistrationRequest(
    request: RegistrationRequest
  ): Observable<unknown> {
    return this.http.post<unknown>(
      `${environment.apiUrl}api/Auth/register`,
      request
    );
  }

  public LogoutRequest(): Observable<unknown> {
    return of(null);
  }
}
