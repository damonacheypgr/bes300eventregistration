import { ActionReducerMap, createSelector } from "@ngrx/store";

import * as fromEmployeeSummary from './employees-summary.reducer';
import * as fromEvents from './events-summary.reducer';
import * as fromSelected from './selected.reducer';
import * as fromParticipants from './participants.reducer';
import * as fromRegistration from './registrations.reducer'
import * as fromWs from './ws.reducer';

export interface AppState {
  employeeSummary: fromEmployeeSummary.EmployeeSummaryState,
  eventsSummary: fromEvents.EventState,
  selected: fromSelected.SelectedState,
  participants: fromParticipants.ParticipantsState,
  registrations: fromRegistration.RegistrationState,
  ws: fromWs.WsRegistrationState

}

export const reducers: ActionReducerMap<AppState> = {
  employeeSummary: fromEmployeeSummary.reducer,
  eventsSummary: fromEvents.reducer,
  selected: fromSelected.reducer,
  participants: fromParticipants.reducer,
  registrations: fromRegistration.reducer,
  ws: fromWs.reducer
}


const selectEmployeeSummaryBranch = (state: AppState) => state.employeeSummary;
const selectEventsSummaryBranch = (state: AppState) => state.eventsSummary;
const selectSelectedBranch = (state: AppState) => state.selected;
const selectParticipantsBranch = (state: AppState) => state.participants;
const selectRegistrationsBranch = (state: AppState) => state.registrations;
const selectWsBranch = (state: AppState) => state.ws;

export const { selectAll: selectAllEmployeesSummary } = fromEmployeeSummary.adapter.getSelectors(selectEmployeeSummaryBranch);
export const { selectAll: selectAllEventSummary } = fromEvents.adapter.getSelectors(selectEventsSummaryBranch);
export const { selectAll: selectAllRegistrations } = fromRegistration.adapter.getSelectors(selectRegistrationsBranch);
export const { selectAll: selectAllWsRegistration } = fromWs.adapter.getSelectors(selectWsBranch);


export const selectWsMessages = createSelector(
  selectWsBranch,
  b => b.messages
)
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
