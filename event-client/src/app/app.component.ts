import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadEmployeeSummary } from './actions/employee-summary.actions';
import { loadEventSummary } from './actions/event-summary.actions';
import { AppState } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'event-client';

  constructor(store: Store<AppState>) {
    store.dispatch(loadEmployeeSummary());
    store.dispatch(loadEventSummary());
  }
}
