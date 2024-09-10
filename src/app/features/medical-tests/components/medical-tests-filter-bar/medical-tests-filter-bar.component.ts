// medical-tests-filter-bar.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { Patient } from 'src/app/features/patient-management/models/patient';
import { GetPatients } from 'src/app/features/patient-management/+state/patient.actions';

@Component({
  selector: 'app-medical-tests-filter-bar',
  templateUrl: './medical-tests-filter-bar.component.html',
  styleUrls: ['./medical-tests-filter-bar.component.scss'],
})
export class MedicalTestsFilterBarComponent {
  @Output() patientSelected = new EventEmitter<Patient>();
  @Output() addMedicalTest = new EventEmitter<void>();

  patientControl = new FormControl();
  filteredPatients$: Observable<Patient[]>;

  constructor(private store: Store) {
    this.filteredPatients$ = this.patientControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterPatients(value))
    );

    // Fetch the patients
    this.store.dispatch(new GetPatients());
  }

  private _filterPatients(value: string): Patient[] {
    const filterValue = value.toLowerCase();
    const patients = this.store.selectSnapshot(
      (state) => state.patients.patients
    );
    return patients.filter((patient: Patient) =>
      patient.name.toLowerCase().includes(filterValue)
    );
  }

  onPatientSelect(patient: Patient): void {
    this.patientSelected.emit(patient);
  }

  onAddMedicalTest(): void {
    this.addMedicalTest.emit();
  }
}
