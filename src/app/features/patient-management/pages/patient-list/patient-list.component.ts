import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PatientState } from '../../+state/patient.state';
import { LoadPatients } from '../../+state/patient.actions';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age', 'gender', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Select(PatientState.patients) patients$: Observable<any[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new LoadPatients());
    this.patients$.subscribe((patients) => {
      this.dataSource.data = patients;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement)?.value || '';
  }
}
