import { State, Action, StateContext } from '@ngxs/store';
import { GetMedicalTests, AddMedicalTest } from './medical-test.actions';
import { MedicalTest } from '../models/medical-test';
import { MedicalTestService } from '../services/medical-test.service';

export class MedicalTestStateModel {
  medicalTests: MedicalTest[] = [];
}

@State<MedicalTestStateModel>({
  name: 'medicalTests',
  defaults: {
    medicalTests: [],
  },
})
export class MedicalTestState {
  constructor(private medicalTestService: MedicalTestService) {}

  @Action(GetMedicalTests)
  getMedicalTests(
    ctx: StateContext<MedicalTestStateModel>,
    action: GetMedicalTests
  ) {
    return this.medicalTestService
      .getMedicalTests(action.patientId)
      .subscribe((tests) => {
        ctx.patchState({ medicalTests: tests });
      });
  }

  @Action(AddMedicalTest)
  addMedicalTest(
    ctx: StateContext<MedicalTestStateModel>,
    action: AddMedicalTest
  ) {
    return this.medicalTestService
      .addMedicalTest(action.payload)
      .subscribe(() => {
        ctx.dispatch(new GetMedicalTests(action.payload.patientId));
      });
  }
}
