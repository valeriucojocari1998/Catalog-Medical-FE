// medical-tests-page.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Patient } from 'src/app/features/patient-management/models/patient';
import { MedicalTest } from '../../models/medical-test';
import {
  AddMedicalTest,
  GetMedicalTests,
} from '../../+state/medical-test.actions';
import { MedicalTestDialogComponent } from '../../components/medical-test-dialog/medical-test-dialog.component';

@Component({
  selector: 'app-medical-tests-page',
  templateUrl: './medical-tests-page.component.html',
  styleUrls: ['./medical-tests-page.component.scss'],
})
export class MedicalTestsPageComponent implements OnInit {
  selectedPatient: Patient | null = null;
  medicalTests: MedicalTest[] = [];

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {}

  onPatientSelected(patient: Patient): void {
    this.selectedPatient = patient;

    // Fetch medical tests for selected patient
    this.store.dispatch(new GetMedicalTests(patient.id)).subscribe(() => {
      this.medicalTests = this.store.selectSnapshot(
        (state) => state.medicalTests.medicalTests
      );
    });
  }

  openAddMedicalTestDialog(): void {
    const dialogRef = this.dialog.open(MedicalTestDialogComponent, {
      width: '400px',
      data: { patientId: this.selectedPatient?.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          new AddMedicalTest({ ...result, patient: this.selectedPatient?.id })
        );
      }
    });
  }
}
