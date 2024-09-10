export class GetMedicalTests {
  static readonly type = '[MedicalTest] Get Medical Tests';
  constructor(public patientId: string) {}
}

export class AddMedicalTest {
  static readonly type = '[MedicalTest] Add Medical Test';
  constructor(public payload: any) {}
}
