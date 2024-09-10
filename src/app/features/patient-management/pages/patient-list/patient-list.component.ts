import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Patient } from '../../models/patient';
import { PatientState } from '../../+state/patient.state';
import { AddPatient, GetPatients } from '../../+state/patient.actions';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { PatientFilterRequest } from '../../models/patient-filter-request';
import { MatDialog } from '@angular/material/dialog';
import { AddPatientComponent } from '../../components/add-patient/add-patient.component';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  expandedElement: Patient | null = null;
  columnsToDisplay: string[] = ['name', 'age', 'gender', 'phone'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

  constructor(private store: Store, private dialog: MatDialog) {
    this.store
      .select(PatientState.getPatients)
      .subscribe((patients) => (this.patients = patients));
  }

  ngOnInit(): void {
    this.store.dispatch(new GetPatients());
  }

  toggleRow(patient: Patient): void {
    this.expandedElement = this.expandedElement === patient ? null : patient;
  }

  applyFilter(filter: PatientFilterRequest): void {
    this.store.dispatch(new GetPatients(filter));
  }

  openAddPatientDialog(): void {
    const dialogRef = this.dialog.open(AddPatientComponent, {
      width: '500px',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((x) => !!x),
        switchMap((x) => this.store.dispatch(new AddPatient(x)))
      )
      .subscribe();
  }
}
