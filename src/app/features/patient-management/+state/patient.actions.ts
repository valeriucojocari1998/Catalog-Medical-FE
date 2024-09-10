import { PatientFilterRequest } from '../models/patient-filter-request';
import { Patient } from '../models/patient';
import { CreatePatientRequest } from '../models/create-patient-request';

export class GetPatients {
  static readonly type = '[Patient] Get Patients';
  constructor(public filter?: PatientFilterRequest) {}
}

export class GetPatientById {
  static readonly type = '[Patient] Get Patient By ID';
  constructor(public id: string) {}
}

export class AddPatient {
  static readonly type = '[Patient] Add Patient';
  constructor(public request: CreatePatientRequest) {} // Create request uses partial fields
}

export class UpdatePatient {
  static readonly type = '[Patient] Update Patient';
  constructor(public request: Patient) {}
}

export class DeletePatient {
  static readonly type = '[Patient] Delete Patient';
  constructor(public id: string) {}
}
