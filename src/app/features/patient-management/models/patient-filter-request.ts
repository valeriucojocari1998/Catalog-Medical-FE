export interface PatientFilterRequest {
  name?: string;
  lastName?: string;
  medicalRecordNumber?: string;
  email?: string;
  phoneNumber?: string;
  gender?: string;
  bloodType?: string;
  dateOfBirthFrom?: Date;
  dateOfBirthTo?: Date;
}
