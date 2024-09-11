import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientManagementRoutingModule } from './patient-management-routing.module';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientListFilterBarComponent } from './components/patient-list-filter-bar/patient-list-filter-bar.component';

@NgModule({
  declarations: [
    AddPatientComponent,
    PatientListComponent,
    PatientListFilterBarComponent,
  ],
  imports: [
    CommonModule,
    PatientManagementRoutingModule,
    FlexLayoutModule,
    SharedMaterialModule,
    ReactiveFormsModule,
  ],
})
export class PatientManagementModule {}
