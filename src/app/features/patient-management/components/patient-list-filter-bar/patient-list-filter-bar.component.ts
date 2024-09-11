import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PatientFilterRequest } from '../../models/patient-filter-request';

@Component({
  selector: 'app-patient-list-filter-bar',
  templateUrl: './patient-list-filter-bar.component.html',
  styleUrls: ['./patient-list-filter-bar.component.scss'],
})
export class PatientListFilterBarComponent {
  filterForm: FormGroup;

  @Output() filterChanged = new EventEmitter<PatientFilterRequest>();
  @Output() addPatient = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      name: [''],
      email: [''],
      phoneNumber: [''],
      gender: [''],
    });
  }

  onFilter() {
    const filterValues: PatientFilterRequest = this.filterForm.value;
    this.filterChanged.emit(filterValues);
  }

  onClear() {
    this.filterChanged.emit();
    this.filterForm.reset();
  }

  onAddPatient() {
    this.addPatient.emit();
  }
}
