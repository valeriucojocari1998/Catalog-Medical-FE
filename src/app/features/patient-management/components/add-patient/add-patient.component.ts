import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent {
  addPatientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddPatientComponent>
  ) {
    // Initialize the form
    this.addPatientForm = this.fb.group({
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSave(): void {
    if (this.addPatientForm.valid) {
      this.dialogRef.close(this.addPatientForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
