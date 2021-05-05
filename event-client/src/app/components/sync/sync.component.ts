import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { clearAllSelected, setSelectedEmployee, setSelectedEvent } from 'src/app/actions/selected.actions';
import { EmployeeSummaryEffects } from 'src/app/effects/employee-summary.effects';
import { AppState, selectAllEmployeesSummary, selectAllEventSummary, selectEventAndEmployeeSelected, selectSelectedEmployee, selectSelectedEvent } from 'src/app/reducers';
import { EmployeeSummaryEntity } from 'src/app/reducers/employees-summary.reducer';
import { EventSummaryEntity } from 'src/app/reducers/events-summary.reducer';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.css']
})
export class SyncComponent implements OnInit {

  employeeSummary$: Observable<EmployeeSummaryEntity[]>;
  events$: Observable<EventSummaryEntity[]>;
  selectedEmployee$: Observable<EmployeeSummaryEntity>;
  selectedEvent$: Observable<EventSummaryEntity>;
  bothSelected$: Observable<boolean>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.employeeSummary$ = this.store.select(selectAllEmployeesSummary);
    this.events$ = this.store.select(selectAllEventSummary);
    this.selectedEmployee$ = this.store.select(selectSelectedEmployee);
    this.selectedEvent$ = this.store.select(selectSelectedEvent);
    this.bothSelected$ = this.store.select(selectEventAndEmployeeSelected);
  }

  eventSelected(event: EventSummaryEntity) {
    this.store.dispatch(setSelectedEvent({ payload: event }));
  }

  employeeSelected(event: EmployeeSummaryEntity) {
    this.store.dispatch(setSelectedEmployee({ payload: event }));
  }

  register(registration: { employee: EmployeeSummaryEntity, event: EventSummaryEntity }) {
    console.log(registration);
  }
  startOver() {
    this.store.dispatch(clearAllSelected());
  }

}
