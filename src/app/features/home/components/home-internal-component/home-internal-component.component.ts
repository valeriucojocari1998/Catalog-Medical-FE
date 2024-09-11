import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppState } from 'src/app/+state/app.state';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-home-internal-component',
  templateUrl: './home-internal-component.component.html',
  styleUrl: './home-internal-component.component.scss',
})
export class HomeInternalComponent implements OnInit {
  name: string | null;
  surname: string | null;
  email: string | null;
  phone: string | null;
  doctorType: string | null;
  constructor(private store: Store) {
    this.store.select(AppState.getName).subscribe((x) => (this.name = x));
    this.store.select(AppState.getSurname).subscribe((x) => (this.surname = x));
    this.store.select(AppState.getEmail).subscribe((x) => (this.email = x));
    this.store.select(AppState.getPhone).subscribe((x) => (this.phone = x));
    this.store
      .select(AppState.getDoctorType)
      .subscribe((x) => (this.doctorType = x));
  }

  ngOnInit(): void {}
}
