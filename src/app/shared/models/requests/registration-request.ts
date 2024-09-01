import { DoctorType } from '../../enum/doctor-type.enum';

export interface RegistrationRequest {
  userName: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  doctorType: DoctorType;
  otherType?: string;
}
