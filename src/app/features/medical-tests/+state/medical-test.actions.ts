export class SelectPatient {
  static readonly type = '[MedicalTest] Select a patient from autocomplete';
  constructor(public patientId: string) {}
}

export class AddMedicalTest {
  static readonly type = '[MedicalTest] Add Medical Test';
  constructor(public payload: any) {}
}
