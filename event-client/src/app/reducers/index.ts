import { ActionReducerMap, createSelector } from "@ngrx/store";

import * as fromEmployeeSummary from './employees-summary.reducer';
import * as fromEvents from './events-summary.reducer';
import * as fromSelected from './selected.reducer';
import * as fromParticipants from './participants.reducer';
import * as fromRegistration from './registrations.reducer'

export interface AppState {
  employeeSummary: fromEmployeeSummary.EmployeeSummaryState,
  eventsSummary: fromEvents.EventState,
  selected: fromSelected.SelectedState,
  participants: fromParticipants.ParticipantsState,
  registrations: fromRegistration.RegistrationState

}

export const reducers: ActionReducerMap<AppState> = {
  employeeSummary: fromEmployeeSummary.reducer,
  eventsSummary: fromEvents.reducer,
  selected: fromSelected.reducer,
  participants: fromParticipants.reducer,
  registrations: fromRegistration.reducer
}


const selectEmployeeSummaryBranch = (state: AppState) => state.employeeSummary;
const selectEventsSummaryBranch = (state: AppState) => state.eventsSummary;
const selectSelectedBranch = (state: AppState) => state.selected;
const selectParticipantsBranch = (state: AppState) => state.participants;
const selectRegistrationsBranch = (state: AppState) => state.registrations;


export const { selectAll: selectAllEmployeesSummary } = fromEmployeeSummary.adapter.getSelectors(selectEmployeeSummaryBranch);
export const { selectAll: selectAllEventSummary } = fromEvents.adapter.getSelectors(selectEventsSummaryBranch);
export const { selectAll: selectAllRegistrations } = fromRegistration.adapter.getSelectors(selectRegistrationsBranch);
export const selectSelectedEmployee = createSelector(
  selectSelectedBranch,
  b => b.employee
)

export const selectSelectedEvent = createSelector(
  selectSelectedBranch,
  b => b.event
)

export const selectEventAndEmployeeSelected = createSelector(
  selectSelectedEmployee,
  selectSelectedEvent,
  (e, v) => e !== null && v !== null
)

export const selectWaitingForParticipant = createSelector(
  selectParticipantsBranch,
  b => b.waiting
)
