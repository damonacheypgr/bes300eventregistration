import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { checkRegistrationStatus, sendRegistration } from 'src/app/actions/registrations.actions';
import { AppState, selectAllEmployeesSummary, selectAllEventSummary, selectAllRegistrations } from 'src/app/reducers';
import { EmployeeSummaryEntity } from 'src/app/reducers/employees-summary.reducer';
import { EventSummaryEntity } from 'src/app/reducers/events-summary.reducer';
import { RegistrationEntity } from 'src/app/reducers/registrations.reducer';

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css']
})
export class AsyncComponent implements OnInit {

  events$: Observable<EventSummaryEntity[]>;
  employees$: Observable<EmployeeSummaryEntity[]>;
  registrations$: Observable<RegistrationEntity[]>;
  form: FormGroup;
  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.events$ = this.store.select(selectAllEventSummary);
    this.employees$ = this.store.select(selectAllEmployeesSummary);
    this.registrations$ = this.store.select(selectAllRegistrations)

    this.form = this.formBuilder.group({
      event: ['', [Validators.required]],
      employee: ['', [Validators.required]]
    });
  }

  get event(): AbstractControl { return this.form.get('event'); }
  get employee(): AbstractControl { return this.form.get('employee'); }

  submit() {
    if (this.form.valid) {
      const payload = {
        event: this.event.value,
        employee: this.employee.value
      };
      this.store.dispatch(sendRegistration(payload));
      this.form.reset();
    } else {
      this.event.markAsTouched();
      this.employee.markAllAsTouched();
    }
  }

  checkStatus(registrationId: string, eventId: string) {
    this.store.dispatch(checkRegistrationStatus({ registrationId, eventId }))
  }
}
