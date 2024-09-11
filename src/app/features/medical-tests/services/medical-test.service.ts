// services/medical-test.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicalTest } from '../models/medical-test';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MedicalTestService {
  constructor(private http: HttpClient) {}

  getMedicalTests(patientId: string): Observable<MedicalTest[]> {
    return this.http.get<MedicalTest[]>(
      `${environment.apiUrl}api/MedicalTests/${patientId}/tests`
    );
  }

  addMedicalTest(patientId: string, medicalTest: FormData): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}api/MedicalTests/${patientId}/add-test`,
      medicalTest
    );
  }

  downloadMedicalTest(testId: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}api/MedicalTests/download/${testId}`,
      { responseType: 'blob' }
    );
  }

  getMedicalTestById(testId: string): Observable<MedicalTest> {
    return this.http.get<MedicalTest>(
      `${environment.apiUrl}api/MedicalTests/${testId}/tests`
    );
  }

  deleteMedicalTest(testId: string): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}api/MedicalTests/${testId}/tests`
    );
  }
}
