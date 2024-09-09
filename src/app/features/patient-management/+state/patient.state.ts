// store/patient.state.ts
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Patient } from '../models/patient';
import { tap } from 'rxjs/operators';
import {
  GetPatients,
  GetPatientById,
  AddPatient,
  UpdatePatient,
  DeletePatient,
} from './patient.actions';
import { PatientFilterRequest } from '../models/patient-filter-request';

export interface PatientStateModel {
  patients: Patient[];
  selectedPatient: Patient | null;
}

@State<PatientStateModel>({
  name: 'patients',
  defaults: {
    patients: [],
    selectedPatient: null,
  },
})
@Injectable()
export class PatientState {
  constructor(private patientService: PatientService) {}

  @Selector()
  static getPatients(state: PatientStateModel): Patient[] {
    return state.patients;
  }

  @Selector()
  static getSelectedPatient(state: PatientStateModel): Patient | null {
    return state.selectedPatient;
  }

  @Action(GetPatients)
  getPatients(ctx: StateContext<PatientStateModel>, action: GetPatients) {
    return this.patientService.getPatients(action.filter).pipe(
      tap((patients: Patient[]) => {
        ctx.patchState({ patients });
      })
    );
  }

  @Action(GetPatientById)
  getPatientById(ctx: StateContext<PatientStateModel>, action: GetPatientById) {
    return this.patientService.getPatientById(action.id).pipe(
      tap((patient: Patient) => {
        ctx.patchState({ selectedPatient: patient });
      })
    );
  }

  @Action(AddPatient)
  addPatient(ctx: StateContext<PatientStateModel>, action: AddPatient) {
    return this.patientService.addPatient(action.request);
  }

  @Action(UpdatePatient)
  updatePatient(ctx: StateContext<PatientStateModel>, action: UpdatePatient) {
    return this.patientService.updatePatient(action.request);
  }

  @Action(DeletePatient)
  deletePatient(ctx: StateContext<PatientStateModel>, action: DeletePatient) {
    return this.patientService.deletePatient(action.id);
  }
}
