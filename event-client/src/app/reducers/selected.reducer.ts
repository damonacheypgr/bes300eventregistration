import { Action, createReducer, on } from "@ngrx/store";
import { EmployeeSummaryEntity } from "./employees-summary.reducer";
import { EventSummaryEntity } from "./events-summary.reducer";
import * as actions from '../actions/selected.actions';

export interface SelectedState {
  employee: EmployeeSummaryEntity,
  event: EventSummaryEntity
}

const initialState: SelectedState = {
  employee: null,
  event: null
}

const myReducer = createReducer(
  initialState,
  on(actions.clearAllSelected, () => initialState),
  on(actions.setSelectedEmployee, (s, a) => ({ ...s, employee: a.payload })),
  on(actions.setSelectedEvent, (s, a) => ({ ...s, event: a.payload })),
  on(actions.clearSelectedEmployee, (s, a) => ({ ...s, employee: null })),
  on(actions.clearSelectedEvent, (s, a) => ({ ...s, event: null }))
)

export function reducer(state: SelectedState, action: Action): SelectedState {
  return myReducer(state, action);
}
