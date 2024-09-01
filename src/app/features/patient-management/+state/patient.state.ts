import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { PatientService } from '../services/patient.service';
import {
  LoadPatients,
  AddPatient,
  UpdatePatient,
  DeletePatient,
} from './patient.actions';
import { tap } from 'rxjs';

export interface PatientStateModel {
  patients: unknown[];
  selectedPatient: any;
}

@State<PatientStateModel>({
  name: 'patient',
  defaults: {
    patients: [],
    selectedPatient: null,
  },
})
@Injectable()
export class PatientState {
  constructor(private patientService: PatientService) {}

  @Selector()
  static patients(state: PatientStateModel) {
    return state.patients;
  }

  @Action(LoadPatients)
  loadPatients({ patchState }: StateContext<PatientStateModel>) {
    return this.patientService.getPatients().pipe(
      tap((result) => {
        patchState({
          patients: result,
        });
      })
    );
  }

  @Action(AddPatient)
  addPatient(
    { getState, patchState }: StateContext<PatientStateModel>,
    { payload }: AddPatient
  ) {
    return this.patientService.addPatient(payload.patient).pipe(
      tap((newPatient) => {
        const state = getState();
        patchState({
          patients: [...state.patients, newPatient],
        });
      })
    );
  }

  @Action(UpdatePatient)
  updatePatient(
    { getState, setState }: StateContext<PatientStateModel>,
    { payload }: UpdatePatient
  ) {
    return this.patientService.updatePatient(payload.patient).pipe(
      tap((updatedPatient) => {
        const state = getState();
        const patients = [...state.patients];
        // const patientIndex = patients.findIndex(
        //   (item) => item['id'] === payload.patient.id
        // );
        // patients[patientIndex] = updatedPatient;
        // setState({
        //   ...state,
        //   patients,
        // });
      })
    );
  }

  @Action(DeletePatient)
  deletePatient(
    { getState, setState }: StateContext<PatientStateModel>,
    { payload }: DeletePatient
  ) {
    return this.patientService.deletePatient(payload.id).pipe(
      tap(() => {
        const state = getState();
        // const filteredArray = state.patients.filter(
        //   (item) => item.id !== payload.id
        // );
        // setState({
        //   ...state,
        //   patients: filteredArray,
        // });
      })
    );
  }
}
