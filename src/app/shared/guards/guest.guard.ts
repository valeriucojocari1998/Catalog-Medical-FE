import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AppState } from 'src/app/+state/app.state';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = this.store.selectSnapshot(AppState.isAuthenticated);

    if (!isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/home-internal/profile']);
      return false;
    }
  }
}
