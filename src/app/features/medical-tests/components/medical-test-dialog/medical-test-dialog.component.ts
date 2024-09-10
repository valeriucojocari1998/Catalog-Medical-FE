// medical-test-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddMedicalTest } from '../../+state/medical-test.actions';

@Component({
  selector: 'app-medical-test-dialog',
  templateUrl: './medical-test-dialog.component.html',
  styleUrls: ['./medical-test-dialog.component.scss'],
})
export class MedicalTestDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MedicalTestDialogComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: { patientId: string }
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: [new Date(), Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const test = { ...this.form.value, patientId: this.data.patientId };
      this.store.dispatch(new AddMedicalTest(test)).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
