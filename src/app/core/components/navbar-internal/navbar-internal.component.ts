import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppLogoutAction } from 'src/app/+state/app.actions';

@Component({
  selector: 'app-navbar-internal',
  templateUrl: './navbar-internal.component.html',
  styleUrls: ['./navbar-internal.component.scss'],
})
export class NavbarInternalComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {}

  logout(): void {
    this.store.dispatch(new AppLogoutAction());
  }
}
