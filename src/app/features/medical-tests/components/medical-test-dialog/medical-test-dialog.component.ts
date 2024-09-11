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
  selectedFile: File | null = null;

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

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.form.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('title', this.form.get('title')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('date', this.form.get('date')?.value);
      formData.append('patientId', this.data.patientId);
      formData.append('file', this.selectedFile);

      this.store.dispatch(new AddMedicalTest(formData)).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
