// services/medical-test.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicalTest } from '../models/medical-test';

@Injectable({
  providedIn: 'root',
})
export class MedicalTestService {
  private apiUrl = 'https://your-api-endpoint/api/medical-tests';

  constructor(private http: HttpClient) {}

  getMedicalTests(patientId: string): Observable<MedicalTest[]> {
    return this.http.get<MedicalTest[]>(`${this.apiUrl}/patient/${patientId}`);
  }

  addMedicalTest(medicalTest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, medicalTest);
  }

  getMedicalTestById(testId: string): Observable<MedicalTest> {
    return this.http.get<MedicalTest>(`${this.apiUrl}/${testId}`);
  }

  deleteMedicalTest(testId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${testId}`);
  }
}
