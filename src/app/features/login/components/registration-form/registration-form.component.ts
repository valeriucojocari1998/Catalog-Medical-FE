import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DoctorType } from 'src/app/shared/enum/doctor-type.enum';
import { RegistrationRequest } from 'src/app/shared/models/requests/registration-request';

export interface RegistrationForm {
  userName: FormControl<string>;
  password: FormControl<string>;
  name: FormControl<string>;
  surname: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  doctorType: FormControl<DoctorType | null>;
  otherType?: FormControl<string>;
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  @Output() registerOutput: EventEmitter<RegistrationRequest> =
    new EventEmitter<RegistrationRequest>();
  public registrationForm: FormGroup<RegistrationForm>;
  public DOCTOR_TYPE = DoctorType;
  public DOCTOR_TYPES = Object.values(DoctorType);

  constructor(private fb: FormBuilder) {}

  public getDoctorTypeValue(): DoctorType | null | undefined {
    return this.registrationForm.value.doctorType;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.registrationForm = this.fb.group<RegistrationForm>({
      userName: this.fb.control<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      password: this.fb.control<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      name: this.fb.control<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      surname: this.fb.control<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      email: this.fb.control<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      phone: this.fb.control<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      doctorType: this.fb.control<DoctorType | null>(null, {
        nonNullable: false,
        validators: Validators.required,
      }),
      otherType: this.fb.control<string>('', { nonNullable: true }),
    });
  }

  submit(): void {
    const formValue = this.registrationForm.value;
    const request: RegistrationRequest = {
      userName: formValue.userName ?? '',
      password: formValue.password ?? '',
      name: formValue.name ?? '',
      surname: formValue.surname ?? '',
      email: formValue.email ?? '',
      phone: formValue.phone ?? '',
      doctorType: formValue.doctorType ?? DoctorType.Other,
      otherType: formValue.otherType ?? '',
    };
    this.registerOutput.emit(request);
  }
}
