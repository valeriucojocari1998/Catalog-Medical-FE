import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddMedicalTest, SelectPatient } from './medical-test.actions';
import { MedicalTest } from '../models/medical-test';
import { MedicalTestService } from '../services/medical-test.service';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

export class MedicalTestStateModel {
  selectedPatient: string;
  medicalTests: MedicalTest[];
}

@State<MedicalTestStateModel>({
  name: 'MedicalTest',
  defaults: {
    selectedPatient: '',
    medicalTests: [],
  },
})
@Injectable()
export class MedicalTestState {
  constructor(private medicalTestService: MedicalTestService) {}

  @Selector()
  static getSelected(state: MedicalTestStateModel): string {
    return state.selectedPatient;
  }

  @Selector()
  static getMedicalTests(state: MedicalTestStateModel): MedicalTest[] {
    return state.medicalTests;
  }

  @Action(SelectPatient)
  getMedicalTests(
    ctx: StateContext<MedicalTestStateModel>,
    action: SelectPatient
  ) {
    ctx.patchState({ selectedPatient: action.patientId });
    const patientId = ctx.getState().selectedPatient;
    if (patientId != null) {
      return this.medicalTestService
        .getMedicalTests(patientId)
        .subscribe((tests) => {
          ctx.patchState({ medicalTests: tests });
        });
    }
    return;
  }

  @Action(AddMedicalTest)
  addMedicalTest(
    ctx: StateContext<MedicalTestStateModel>,
    action: AddMedicalTest
  ) {
    const patientId = ctx.getState().selectedPatient;
    if (patientId != null) {
      const formData = action.payload;
      return this.medicalTestService.addMedicalTest(patientId, formData).pipe(
        tap((newMT) => {
          const mts = ctx.getState().medicalTests;
          const newMTs = [newMT, ...mts];
          ctx.patchState({ medicalTests: newMTs });
        })
      );
    }
    return;
  }
}
