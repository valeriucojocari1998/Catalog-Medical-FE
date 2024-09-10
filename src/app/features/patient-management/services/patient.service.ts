// services/patient.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';
import { PatientFilterRequest } from '../models/patient-filter-request';
import { environment } from 'src/environments/environment';
import { CreatePatientRequest } from '../models/create-patient-request';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = `${environment.apiUrl}api/patients`;

  constructor(private http: HttpClient) {}

  getPatients(
    userId: string,
    filter?: PatientFilterRequest
  ): Observable<Patient[]> {
    return this.http.post<Patient[]>(
      `${environment.apiUrl}api/patients/${userId}/list`,
      filter
    );
  }

  getPatientById(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  addPatient(
    userId: string,
    request: CreatePatientRequest
  ): Observable<Patient> {
    return this.http.post<Patient>(
      `${environment.apiUrl}api/patients/${userId}/create`,
      request
    );
  }

  updatePatient(request: Patient): Observable<void> {
    return this.http.put<void>(this.apiUrl, request);
  }

  deletePatient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
