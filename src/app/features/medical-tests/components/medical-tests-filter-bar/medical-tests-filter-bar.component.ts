// medical-tests-filter-bar.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { Patient } from 'src/app/features/patient-management/models/patient';
import { GetPatients } from 'src/app/features/patient-management/+state/patient.actions';
import { PatientState } from 'src/app/features/patient-management/+state/patient.state';
import { SelectPatient } from '../../+state/medical-test.actions';
import { MedicalTestState } from '../../+state/medical-test.state';

@Component({
  selector: 'app-medical-tests-filter-bar',
  templateUrl: './medical-tests-filter-bar.component.html',
  styleUrls: ['./medical-tests-filter-bar.component.scss'],
})
export class MedicalTestsFilterBarComponent implements OnInit {
  @Output() patientSelected = new EventEmitter<Patient>();
  @Output() addMedicalTest = new EventEmitter<void>();

  patientControl = new FormControl();
  filteredPatients$: Observable<Patient[]>;

  constructor(private store: Store) {
    this.filteredPatients$ = this.patientControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterPatients(value))
    );
  }

  ngOnInit(): void {
    this.store
      .dispatch(new GetPatients())
      .pipe(
        tap(() => {
          const patients = this.store.selectSnapshot(PatientState.getPatients);
          if (!patients?.length) {
            return;
          }
          const selectedPatient = this.store.selectSnapshot(
            MedicalTestState.getSelected
          );
          const selected = patients.find((x) => x.id === selectedPatient);
          if (!!selectedPatient) {
            if (!!selected) {
              this.onPatientSelect(selected);
              return;
            }
          }
          this.onPatientSelect(patients[0]);
        })
      )
      .subscribe();
  }

  private _filterPatients(value: string): Patient[] {
    const filterValue = value.toLowerCase();
    const patients = this.store.selectSnapshot(PatientState.getPatients);
    return patients.filter((patient: Patient) =>
      patient.name.toLowerCase().includes(filterValue)
    );
  }

  onPatientSelect(patient: Patient): void {
    this.patientControl.setValue(patient.name, { emitEvent: false });
    this.patientSelected.emit(patient);
  }

  onAddMedicalTest(): void {
    this.addMedicalTest.emit();
  }
}
