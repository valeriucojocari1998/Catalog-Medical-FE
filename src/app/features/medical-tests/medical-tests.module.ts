import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalTestsRoutingModule } from './medical-tests-routing.module';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicalTestsFilterBarComponent } from './components/medical-tests-filter-bar/medical-tests-filter-bar.component';
import { MedicalTestsPageComponent } from './pages/medical-tests-page/medical-tests-page.component';
import { MedicalTestDialogComponent } from './components/medical-test-dialog/medical-test-dialog.component';

@NgModule({
  declarations: [
    MedicalTestsFilterBarComponent,
    MedicalTestsPageComponent,
    MedicalTestDialogComponent,
  ],
  imports: [
    CommonModule,
    MedicalTestsRoutingModule,
    SharedMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
})
export class MedicalTestsModule {}
