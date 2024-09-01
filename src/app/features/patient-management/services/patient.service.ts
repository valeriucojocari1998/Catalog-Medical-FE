import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor() {}

  getPatients(): Observable<unknown[]> {
    return of();
  }

  addPatient(patient: any): Observable<unknown> {
    return of();
  }

  updatePatient(patient: any): Observable<unknown> {
    return of();
  }

  deletePatient(id: number): Observable<unknown> {
    return of();
  }
}
