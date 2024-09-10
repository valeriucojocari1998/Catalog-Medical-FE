import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalTestsPageComponent } from './pages/medical-tests-page/medical-tests-page.component';

const routes: Routes = [{ path: '', component: MedicalTestsPageComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalTestsRoutingModule {}
