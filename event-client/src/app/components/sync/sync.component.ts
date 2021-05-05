import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { addToParticipants } from 'src/app/actions/participatnt.actions';
import { clearAllSelected, setSelectedEmployee, setSelectedEvent } from 'src/app/actions/selected.actions';
import { EmployeeSummaryEffects } from 'src/app/effects/employee-summary.effects';
import { AppState, selectAllEmployeesSummary, selectAllEventSummary, selectEventAndEmployeeSelected, selectSelectedEmployee, selectSelectedEvent, selectWaitingForParticipant } from 'src/app/reducers';
import { EmployeeSummaryEntity } from 'src/app/reducers/employees-summary.reducer';
import { EventSummaryEntity } from 'src/app/reducers/events-summary.reducer';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.css']
})
export class SyncComponent implements OnInit, OnDestroy {

  employeeSummary$: Observable<EmployeeSummaryEntity[]>;
  events$: Observable<EventSummaryEntity[]>;
  selectedEmployee$: Observable<EmployeeSummaryEntity>;
  selectedEvent$: Observable<EventSummaryEntity>;
  bothSelected$: Observable<boolean>;
  subscriptions: Subscription[] = [];
  constructor(private store: Store<AppState>, private modal: NgbModal) { }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.employeeSummary$ = this.store.select(selectAllEmployeesSummary);
    this.events$ = this.store.select(selectAllEventSummary);
    this.selectedEmployee$ = this.store.select(selectSelectedEmployee);
    this.selectedEvent$ = this.store.select(selectSelectedEvent);
    this.bothSelected$ = this.store.select(selectEventAndEmployeeSelected);

    const s = this.store.select(selectWaitingForParticipant).subscribe(d => {
      if (!d) {
        this.modal.dismissAll();
      }
    })

    this.subscriptions.push(s);
  }

  eventSelected(event: EventSummaryEntity) {
    this.store.dispatch(setSelectedEvent({ payload: event }));
  }

  employeeSelected(event: EmployeeSummaryEntity) {
    this.store.dispatch(setSelectedEmployee({ payload: event }));
  }

  register(registration: { employee: EmployeeSummaryEntity, event: EventSummaryEntity }, content: any) {
    this.modal.open(content);
    this.store.dispatch(addToParticipants(registration));
  }
  startOver() {
    this.store.dispatch(clearAllSelected());
  }

}
