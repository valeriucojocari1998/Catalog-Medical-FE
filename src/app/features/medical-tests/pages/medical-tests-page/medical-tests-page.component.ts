// medical-tests-page.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Patient } from 'src/app/features/patient-management/models/patient';
import { MedicalTest } from '../../models/medical-test';
import {
  AddMedicalTest,
  SelectPatient,
} from '../../+state/medical-test.actions';
import { MedicalTestDialogComponent } from '../../components/medical-test-dialog/medical-test-dialog.component';
import { MedicalTestState } from '../../+state/medical-test.state';
import { GetPatients } from 'src/app/features/patient-management/+state/patient.actions';
import { of, switchMap } from 'rxjs';
import { PatientState } from 'src/app/features/patient-management/+state/patient.state';
import { MedicalTestService } from '../../services/medical-test.service';

@Component({
  selector: 'app-medical-tests-page',
  templateUrl: './medical-tests-page.component.html',
  styleUrls: ['./medical-tests-page.component.scss'],
})
export class MedicalTestsPageComponent implements OnInit {
  selectedPatient: Patient | null = null;
  medicalTests: MedicalTest[] = [];

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private medicalTestService: MedicalTestService
  ) {}

  ngOnInit(): void {
    this.store
      .select(MedicalTestState.getMedicalTests)
      .subscribe((tests) => (this.medicalTests = tests));
  }

  onPatientSelected(patient: Patient): void {
    this.selectedPatient = patient;

    this.store.dispatch([new SelectPatient(patient.id)]).subscribe(() => {
      this.medicalTests = this.store.selectSnapshot(
        MedicalTestState.getMedicalTests
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

  onDownload(test: MedicalTest): void {
    this.medicalTestService.downloadMedicalTest(test.id).subscribe((blob) => {
      console.log(blob);
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = `${test.title}.pdf`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  // Method to view the medical test in a new tab
  onViewInNewTab(test: MedicalTest): void {
    this.medicalTestService.downloadMedicalTest(test.id).subscribe((blob) => {
      const objectUrl = URL.createObjectURL(blob);
      window.open(objectUrl, '_blank');
    });
  }

  sendTestByEmail(test: MedicalTest): void {
    this.medicalTestService.sendTestByEmail(test.id).subscribe();
  }
}
