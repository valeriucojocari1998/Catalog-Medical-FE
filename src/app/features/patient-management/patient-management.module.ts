import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientManagementRoutingModule } from './patient-management-routing.module';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { PatientInformationComponent } from './pages/patient-information/patient-information.component';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { NgxsModule } from '@ngxs/store';
import { PatientState } from './+state/patient.state';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientListFilterBarComponent } from './components/patient-list-filter-bar/patient-list-filter-bar.component';

@NgModule({
  declarations: [
    AddPatientComponent,
    PatientInformationComponent,
    PatientListComponent,
    PatientListFilterBarComponent,
  ],
  imports: [
    CommonModule,
    PatientManagementRoutingModule,
    FlexLayoutModule,
    SharedMaterialModule,
    NgxsModule.forRoot([PatientState]),
    ReactiveFormsModule,
  ],
})
export class PatientManagementModule {}
