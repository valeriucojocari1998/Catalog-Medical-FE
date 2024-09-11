// patient-information.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Patient } from '../../models/patient';
import { GetPatientById } from '../../+state/patient.actions';
import { PatientState } from '../../+state/patient.state';

@Component({
  selector: 'app-patient-information',
  templateUrl: './patient-information.component.html',
  styleUrls: ['./patient-information.component.scss'],
})
export class PatientInformationComponent implements OnInit {
  patient?: Patient | null;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetPatientById(id ?? ''));
    this.patient = this.store.selectSnapshot(PatientState.getSelectedPatient);
  }
}
