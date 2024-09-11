import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../../models/patient';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent implements OnInit {
  addPatientForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { patient?: Patient }
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.patient) {
      this.isEditMode = true;
      this.initializeForm(this.data.patient);
    } else {
      this.initializeForm();
    }
  }

  initializeForm(patient?: Patient): void {
    this.addPatientForm = this.fb.group({
      name: [patient ? patient.name : '', Validators.required],
      dateOfBirth: [patient ? patient.dateOfBirth : '', Validators.required],
      gender: [patient ? patient.gender : '', Validators.required],
      phoneNumber: [
        patient ? patient.phoneNumber : '',
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
      email: [
        patient ? patient.email : '',
        [Validators.required, Validators.email],
      ],
    });
  }

  onSave(): void {
    if (this.addPatientForm.valid) {
      this.dialogRef.close({
        ...this.addPatientForm.value,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
