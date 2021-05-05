import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/employee-summary.actions';
export interface EmployeeSummaryEntity {
  id: string;
  firstName: string;
  lastName: string;
}

export interface EmployeeSummaryState extends EntityState<EmployeeSummaryEntity> {

}

export const adapter = createEntityAdapter<EmployeeSummaryEntity>();

const initialState = adapter.getInitialState();

const reducerFunction = createReducer(
  initialState,
  on(actions.loadEmployeeSummary, () => initialState),
  on(actions.loadEmployeeSummarySucceeded, (s, a) => adapter.setAll(a.payload, s))
);

export function reducer(state: EmployeeSummaryState = initialState, action: Action): EmployeeSummaryState {
  return reducerFunction(state, action);
}



