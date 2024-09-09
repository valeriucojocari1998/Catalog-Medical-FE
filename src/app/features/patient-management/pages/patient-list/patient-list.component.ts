// patient-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Patient } from '../../models/patient';
import { PatientState } from '../../+state/patient.state';
import { GetPatients } from '../../+state/patient.actions';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  displayedColumns: string[] = ['name', 'age', 'gender', 'phone', 'actions'];
  expandedElement: Patient | null;

  constructor(private store: Store) {
    this.store
      .select(PatientState.getPatients)
      .subscribe((x) => (this.patients = x));
  }

  ngOnInit(): void {
    this.store.dispatch(new GetPatients());
  }

  toggleRow(element: Patient): void {
    this.expandedElement = this.expandedElement === element ? null : element;
  }
}
