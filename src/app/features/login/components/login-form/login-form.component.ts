import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { filter } from 'rxjs';
import { AppState } from 'src/app/+state/app.state';
import { LoginRequest } from 'src/app/shared/models/requests/login-request';

export interface LoginForm {
  userName: FormControl<string>;
  password: FormControl<string>;
}
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Output() loginOutput: EventEmitter<LoginRequest> =
    new EventEmitter<LoginRequest>();
  public loginForm: FormGroup<LoginForm>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.buildForm();
    this.store.select(AppState.loginException).subscribe((x) => {
      if (x) {
        this.loginForm.controls.password.setErrors({ login: true });
      }
    });
  }

  buildForm(): void {
    this.loginForm = this.fb.group<LoginForm>({
      userName: this.fb.control<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      password: this.fb.control<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
    });
  }

  submit(): void {
    const formValue = this.loginForm.value;
    const request: LoginRequest = {
      userName: formValue.userName ?? '',
      password: formValue.password ?? '',
    };
    this.loginOutput.emit(request);
  }
}
