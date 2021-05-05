import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/ws.actions';
export interface WsRegistrationEntity {
  id: string;
  employeeName: string;
  eventName: string;
  eventId: string;
  status: string;
}

export interface WsRegistrationState extends EntityState<WsRegistrationEntity> {
  messages: string[]
}

export const adapter = createEntityAdapter<WsRegistrationEntity>();

const initialState = adapter.getInitialState({
  messages: []
});

const reducerFunction = createReducer(
  initialState,
  on(actions.messageReceived, (s, a) => ({ ...s, messages: [a.message, ...s.messages] })),
  on(actions.registrationAdded, (s, a) => adapter.addOne(a.registration, s)),
  on(actions.registrationApproved, (s, a) => adapter.updateOne({
    id: a.registrationId,
    changes: {
      status: a.status
    }
  }, s)),
);

export function reducer(state: WsRegistrationState = initialState, action: Action): WsRegistrationState {
  return reducerFunction(state, action);
}



