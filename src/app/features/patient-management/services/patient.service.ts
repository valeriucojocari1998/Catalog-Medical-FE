// services/patient.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';
import { PatientFilterRequest } from '../models/patient-filter-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = `${environment.apiUrl}api/patients`;

  constructor(private http: HttpClient) {}

  getPatients(filter?: PatientFilterRequest): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl, { params: filter as any });
  }

  getPatientById(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  addPatient(request: Partial<Patient>): Observable<void> {
    return this.http.post<void>(this.apiUrl, request);
  }

  updatePatient(request: Patient): Observable<void> {
    return this.http.put<void>(this.apiUrl, request);
  }

  deletePatient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
