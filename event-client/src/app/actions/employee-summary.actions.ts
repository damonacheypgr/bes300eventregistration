import { createAction, props } from "@ngrx/store";
import { EmployeeSummaryEntity } from "../reducers/employees-summary.reducer";


export const loadEmployeeSummary = createAction(
  '[app] employee summary - load employee summary'
);

export const loadEmployeeSummarySucceeded = createAction(
  '[app] employee summary - load employee summary succeeded',
  props<{ payload: EmployeeSummaryEntity[] }>()
);

