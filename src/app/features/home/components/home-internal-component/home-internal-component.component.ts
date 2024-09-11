import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-home-internal-component',
  templateUrl: './home-internal-component.component.html',
  styleUrl: './home-internal-component.component.scss',
})
export class HomeInternalComponent implements OnInit {
  userName: string | null = 'John Doe';
  constructor(private storageService: LocalStorageService) {
    // this.userName = this.storageService.getUsername();
  }

  name = 'John';
  surname = 'Doe';
  email = 'jonh.doe@gmail.com';
  phone = '=12312312312';
  doctorType = 'reumathologinst';
  otherType = 'othertype';

  ngOnInit(): void {}
}
