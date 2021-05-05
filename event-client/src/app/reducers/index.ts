import { ActionReducerMap, createSelector } from "@ngrx/store";

import * as fromEmployeeSummary from './employees-summary.reducer';
import * as fromEvents from './events-summary.reducer';
import * as fromSelected from './selected.reducer';

export interface AppState {
  employeeSummary: fromEmployeeSummary.EmployeeSummaryState,
  eventsSummary: fromEvents.EventState,
  selected: fromSelected.SelectedState

}

export const reducers: ActionReducerMap<AppState> = {
  employeeSummary: fromEmployeeSummary.reducer,
  eventsSummary: fromEvents.reducer,
  selected: fromSelected.reducer
}


const selectEmployeeSummaryBranch = (state: AppState) => state.employeeSummary;
const selectEventsSummaryBranch = (state: AppState) => state.eventsSummary;
const selectSelectedBranch = (state: AppState) => state.selected;


export const { selectAll: selectAllEmployeesSummary } = fromEmployeeSummary.adapter.getSelectors(selectEmployeeSummaryBranch);
export const { selectAll: selectAllEventSummary } = fromEvents.adapter.getSelectors(selectEventsSummaryBranch);

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
