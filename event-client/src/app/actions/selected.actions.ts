import { createAction, props } from "@ngrx/store";
import { EmployeeSummaryEntity } from "../reducers/employees-summary.reducer";
import { EventSummaryEntity } from "../reducers/events-summary.reducer";


export const setSelectedEvent = createAction(
  '[app] set selectedEvent',
  props<{ payload: EventSummaryEntity }>()
);

export const setSelectedEmployee = createAction(
  '[app] set selected employee',
  props<{ payload: EmployeeSummaryEntity }>()
);

export const clearSelectedEmployee = createAction(
  '[app] clear selected employee'
);

export const clearSelectedEvent = createAction(
  '[app] clear selected event'
);

export const clearAllSelected = createAction(
  '[app] clear all selected'
);
