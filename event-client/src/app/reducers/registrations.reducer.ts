import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/registrations.actions';

export interface RegistrationEntity {
  id: string;
  employeeName: string;
  eventName: string;
  eventId: string;
  status: string;
}

export interface RegistrationState extends EntityState<RegistrationEntity> {

}

export const adapter = createEntityAdapter<RegistrationEntity>();

const initialState = adapter.getInitialState();

const reducerFunction = createReducer(
  initialState,
  on(actions.checkRegistrationStatusSucceeded, (s, a) => adapter.updateOne({
    id: a.registionId,
    changes: {
      status: a.status
    }
  }, s)),
  on(actions.sendRegistration, (s, a) => adapter.addOne(a.payload, s)),
  on(actions.sendRegistrationSucceeded, (s, a) => adapter.updateOne({
    id: a.oldId,
    changes: {
      id: a.payload.id,
      status: a.payload.status
    }
  }, s))
);

export function reducer(state: RegistrationState = initialState, action: Action): RegistrationState {
  return reducerFunction(state, action);
}



