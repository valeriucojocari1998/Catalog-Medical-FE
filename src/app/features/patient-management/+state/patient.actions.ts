export class LoadPatients {
  static readonly type = '[Patient] Load Patients';
}

export class AddPatient {
  static readonly type = '[Patient] Add Patient';
  constructor(public payload: { patient: any }) {}
}

export class UpdatePatient {
  static readonly type = '[Patient] Update Patient';
  constructor(public payload: { patient: any }) {}
}

export class DeletePatient {
  static readonly type = '[Patient] Delete Patient';
  constructor(public payload: { id: number }) {}
}
