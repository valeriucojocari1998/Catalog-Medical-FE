// store/patient.state.ts
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Patient } from '../models/patient';
import { tap } from 'rxjs/operators';
import {
  GetPatients,
  AddPatient,
  UpdatePatient,
  DeletePatient,
  EditPatient,
} from './patient.actions';
import { AppState } from 'src/app/+state/app.state';

export interface PatientStateModel {
  patients: Patient[];
}

@State<PatientStateModel>({
  name: 'patients',
  defaults: {
    patients: [],
  },
})
@Injectable()
export class PatientState {
  constructor(private store: Store, private patientService: PatientService) {}

  @Selector()
  static getPatients(state: PatientStateModel): Patient[] {
    return state.patients;
  }

  @Action(GetPatients)
  getPatients(ctx: StateContext<PatientStateModel>, action: GetPatients) {
    var userId = this.store.selectSnapshot(AppState.userId);
    if (!userId) {
      return;
    }
    return this.patientService.getPatients(userId, action.filter).pipe(
      tap((patients: Patient[]) => {
        ctx.patchState({ patients: patients });
      })
    );
  }

  @Action(AddPatient)
  addPatient(ctx: StateContext<PatientStateModel>, action: AddPatient) {
    var userId = this.store.selectSnapshot(AppState.userId);
    if (!userId) {
      return;
    }
    return this.patientService.addPatient(userId, action.request).pipe(
      tap((x) => {
        const patients = ctx.getState().patients;
        const newPatients = [x, ...patients];
        ctx.patchState({ patients: newPatients });
      })
    );
  }

  @Action(EditPatient)
  editPatient(ctx: StateContext<PatientStateModel>, action: EditPatient) {
    return this.patientService
      .editPatient(action.patientId, action.request)
      .pipe(
        tap((x) => {
          const patients = ctx.getState().patients;
          const newPatients = [x, ...patients.filter((y) => y.id !== x.id)];
          ctx.patchState({ patients: newPatients });
        })
      );
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
