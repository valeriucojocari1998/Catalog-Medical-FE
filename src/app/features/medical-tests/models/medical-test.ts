export interface MedicalTest {
  id: string;
  patientId: string;
  title: string;
  description: string;
  date: Date;
  fileUrl: string;
}
