import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/event-summary.actions';
export interface EventSummaryEntity {
  id: string;
  name: string;
  longDescription: string;
  hostedBy: string;
}

export interface EventState
  extends EntityState<EventSummaryEntity> {

}

export const adapter = createEntityAdapter<EventSummaryEntity>();

const initialState = adapter.getInitialState();

const reducerFunction = createReducer(
  initialState,
  on(actions.loadEventSummary, () => initialState),
  on(actions.loadEventSummarySucceeded, (s, a) => adapter.setAll(a.payload, s))
);

export function reducer(state: EventState
  = initialState, action: Action): EventState {
  return reducerFunction(state, action);
}



