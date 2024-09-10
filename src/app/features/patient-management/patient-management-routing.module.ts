import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { PatientInformationComponent } from './pages/patient-information/patient-information.component';

const routes: Routes = [
  { path: '', component: PatientListComponent },
  { path: 'add', component: AddPatientComponent },
  { path: 'info/:id', component: PatientInformationComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientManagementRoutingModule {}
